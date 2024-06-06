import hashlib
from knox.auth import TokenAuthentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from . models import UploadedDocument, AssociatedQuestions
from .serializers import (
    UploadedDocumentSerializer, AssociatedQuestionsSerializer
)
from .LargeLanguageModels import Claude2AnthropicLargeLanguageModel

anthropic_claude2_llm = Claude2AnthropicLargeLanguageModel(max_tokens=700)

class GenerateQuestionsFromDocumentView(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser, FormParser,]

    def post(self, request):
        file_obj = request.FILES.get('file', None)
        provided_hash = request.data.get('sha512hash_file', None)

        if not provided_hash:
            return Response({"sha512hash_file": "This field is required."},
                            status=status.HTTP_400_BAD_REQUEST)

        # If file is there in the request check if it already exists
        if file_obj:
            file_hash = hashlib.sha512(file_obj.read()).hexdigest()

            if provided_hash != file_hash:
                return Response({
                    "detail": "Provided hash and file hash do not match.",
                    "ERR_IDENT": "HASH_NOT_MATCH"
                    },status=status.HTTP_400_BAD_REQUEST)

            associated_questions = AssociatedQuestions.objects.filter(
                        associated_hash=file_hash).first()

            # File already exists no need to save it again
            if associated_questions:
                return Response({"questions": associated_questions},
                            status=status.HTTP_200_OK)

            # Reset file pointer
            file_obj.seek(0)

            # Check if uploaded document object (record) exists for the hash
            uploaded_document_obj = UploadedDocument.objects.filter(
                        sha512hash_file=file_hash).first()

            if uploaded_document_obj:
                # File associated with this obj already exists
                if uploaded_document_obj.file_exists_irl:
                    return Response({
                        "detail": "File associated with this hash already exists",
                        "ERR_IDENT": "ASS_FILE_EXIST_ALRD"
                        },status=status.HTTP_400_BAD_REQUEST)

                uploaded_document_obj.associated_file = file_obj
                uploaded_document_obj.file_exists_irl = True
                uploaded_document_obj.save()

                # GENERATE QUESTIONS FROM LLM
                extracted_text = anthropic_claude2_llm.extract_text_from_file(file_obj)

                if len(extracted_text) > 0:
                    questions = anthropic_claude2_llm.generate_questions_from_text(extracted_text)

                    if type(questions) == dict:
                        # Response from the LLM is complete
                        return Response({"questions": questions, "complete": True},
                                        status=status.HTTP_200_OK)
                    
                    return Response({"questions": questions, "complete": False},
                                        status=status.HTTP_206_PARTIAL_CONTENT)


                return Response({
                            "detail": "No text could be extracted",
                            "ERR_IDENT": "NO_TXT_FOUND"
                            },status=status.HTTP_406_NOT_ACCEPTABLE)

            # Upload document object does not exist
            new_uploaded_document_obj = UploadedDocument.objects.create(
                associated_file = file_obj,
                sha512hash_file = file_hash,
                file_exists_irl = True
            )

            # GENERATE QUESTIONS FROM LLM
            extracted_text = anthropic_claude2_llm.extract_text_from_file(file_obj)

            if len(extracted_text) > 0:
                questions = anthropic_claude2_llm.generate_questions_from_text(extracted_text)

                if type(questions) == dict:
                    # Response from the LLM is complete
                    return Response({"questions": questions, "complete": True},
                                    status=status.HTTP_200_OK)
                
                return Response({"questions": questions, "complete": False},
                                    status=status.HTTP_206_PARTIAL_CONTENT)


            return Response({
                        "detail": "No text could be extracted",
                        "ERR_IDENT": "NO_TXT_FOUND"
                        },status=status.HTTP_406_NOT_ACCEPTABLE)

        # File has not been provided, check if the hash exists or not
        else:
            associated_questions = AssociatedQuestions.objects.filter(
                        associated_hash=provided_hash).first()

            # Hash already exists, just give the questions
            if associated_questions:
                return Response({"questions": associated_questions},
                            status=status.HTTP_200_OK)
            
            # Hash doesn't exist make an empty record for this hash and store the
            # file corresponding to this hash. Whenever it comes (within a tbd time-frame)

            uploaded_document_obj = UploadedDocument.objects.get_or_create(sha512hash_file=provided_hash)

            return Response({"detail": "Send file in next request. ASAP."},
                                status=status.HTTP_201_CREATED)
