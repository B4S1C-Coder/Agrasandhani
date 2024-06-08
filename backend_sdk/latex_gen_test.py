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

def test_generateLatexFromImg(token):
    headers = {
        "Authorization": f"Token {token}",
    }

    files = {"file": open("equations.png", "rb")}

    latex_response = requests.post(
            HOST_URL+"ocr-expressions/latex/",
            headers=headers,
            files=files,
    )
    
    print(f"[ {latex_response.status_code} ] {latex_response.text}")

    if latex_response.status_code - 200 >= 100:
        return None

    return latex_response.json()

def test_logout(token):
    headers = {
        "Authorization": f"Token {token}",
    }

    logout_response = requests.post(HOST_URL+"user-management/logout/", headers=headers)

    print(f"[ {logout_response.status_code} ] {logout_response.text}")

def main():
    token = test_loginAndObtainToken()

    if token:
        questions = test_generateLatexFromImg(token)
        test_logout(token)

    print("exited ...")

if __name__ == "__main__":
    main()