from knox.auth import TokenAuthentication
from rest_framework import permissions
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from .OCR_Expressions import OCRExpressionWorker

ocr_worker = OCRExpressionWorker()

class GenerateLatexExpressionFromImage(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = [MultiPartParser, FormParser,]

    def post(self, request):
        file_obj = request.FILES.get('file', None)

        if not file_obj:
            return Response({"detail": "No image uploaded"},
                                    status=status.HTTP_400_BAD_REQUEST)

        try:
            latex_expression = ocr_worker.get_latex_expression(file_obj)

            return Response({"expression": latex_expression},
                                    status=status.HTTP_200_OK)

        except Exception as err:
            return Response({
                "detail": "Couldn't perform OCR. Ensure file is an image",
                "ERR_IDENT": "OCR_NOT_SUPP_FILE",
                "ERR_BODY": err,
                }, status=status.HTTP_400_BAD_REQUEST)
