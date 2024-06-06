import requests

CREDS = ("testusersdk", "sdk123")

HOST_URL = "http://127.0.0.1:5000/"

def test_loginAndObtainToken():
    login_response = requests.post(HOST_URL+"user-management/login/", auth=CREDS)

    print(f"[ {login_response.status_code} ] {login_response.text}")

    if login_response.status_code - 200 >= 100:
        return None

    token = login_response.json()["token"]
    return token

def test_generateQuestionFromDoc(token):
    headers = {
        "Authorization": f"Token {token}",
    }

    sah512hash_resource = "379b29d3fa2a889da2d90d3ae4e48e80db22047b97aa3b375a327b1ec89d5a45699ffe45982f5b8d4951dbe33028c39195c9d8a6e6d5783c895225fdc96c2662"

    files = {"file": open("resource.pdf", "rb")}

    questions_response = requests.post(
            HOST_URL+"question-generation/generate/",
            headers=headers,
            # files=files,
            data={
                "sha512hash_file": sah512hash_resource,
            }
    )
    
    print(f"[ {questions_response.status_code} ] {questions_response.text}")

    if questions_response.status_code - 200 >= 100:
        return None

    return questions_response.json()

def test_logout(token):
    headers = {
        "Authorization": f"Token {token}",
    }

    logout_response = requests.post(HOST_URL+"user-management/logout/", headers=headers)

    print(f"[ {logout_response.status_code} ] {logout_response.text}")

def main():
    token = test_loginAndObtainToken()

    if token:
        questions = test_generateQuestionFromDoc(token)
        test_logout(token)

    print("exited ...")

if __name__ == "__main__":
    main()