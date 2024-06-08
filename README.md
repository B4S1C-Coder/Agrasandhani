# Agrasandhani

![Logo](https://github.com/B4S1C-Coder/Agrasandhani/blob/main/agrasandhani_logo.png)

Agrasandhani is a study guidance and assistance tool designed to help students grasp complex topics with ease, interact with their study materials in a more effective and productive way and take advantage of personal study plans and feedback.

## Tech Stack
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [LangChain](https://www.langchain.com/)
- [React JS](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TensorFlow](https://www.tensorflow.org/) / [PyTorch](https://pytorch.org/)
- [MySQL](https://www.mysql.com/)

>**Note**: For **OCR Recognition** we have used an open source project [Texify](https://github.com/VikParuchuri/texify/). As of now, OCR is only accessible through a dedicated endpoint that accepts images and returns the equivalent Latex expressions of the expressions in the image.

## Features
- **OCR Model**
The OCR model will be trained on a dataset of mathematical expressions, including Fourier series, to recognize and segment the symbols and equations accurately. The model will incorporate techniques such as:

  - **Deep Learning Models**: Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) will be used to capture hierarchical structures and semantic relationships within mathematical expressions.


  - **Semantic Information and Contextual Embedding**: Strong symbol recognition capabilities will be integrated by leveraging semantic information and contextual embedding.


  - **Noise-Robust Recognition Algorithms**: Noise-robust recognition algorithms and robust preprocessing techniques will be employed to handle noise and distortion in input images.


  - **Domain-Specific Knowledge**: LaTeX syntax constraints will be integrated during training, and active learning strategies will be used to refine contextual information utilisation.

- **LLM Integration**
The ASCII output from the OCR model will be fed into an LLM. The LLM will analyse the ASCII data and generate interactive quizzes, personalised study plans, and graphical visualisations to enhance the learning experience not only based on the OCR but also other models and data of the student.

- **Interactive Quizzes**
The LLM will generate quizzes that test students' understanding of Fourier series concepts. These quizzes will include:

  - Multiple Choice Questions
  - Fill-in-the-Blank Questions
  - Short Answer Questions

- **Personalized Study Plans**
The LLM will generate personalised study plans tailored to each student's unique learning needs and preferences. These plans will include:

 - Customised Study Schedules: Students will receive customised study schedules that outline specific topics and concepts to focus on. These will automatically be added to the calendar.

- **Graphical Visualisations**
We will generate graphical visualisations that help students visualise and understand complex mathematical concepts. These visualisations include:

  - Interactive Graphs
  - 3D Visualisations

- **Integration with Educational Platforms**
The solution will integrate with existing educational platforms to provide a seamless learning experience. This integration will include:

  - **API Integration**: The solution will integrate with educational platforms through APIs to provide a seamless learning experience.

  - **Data Exchange**: The solution will exchange data with educational platforms to ensure that student progress and performance are accurately tracked.

- **Evaluation Metrics**
The performance of the OCR model and the LLM will be evaluated using metrics such as:

  - Accuracy
  - Precision
  - Recall
  - F1 Score

## Motivation & Problem Statement
This project has the potential to revolutionise how students learn and understand complex mathematical concepts like Fourier series. Here are some of the key challenges it will address:

- **Ineffective Learning Materials**: Traditional study materials like textbooks and lecture notes often struggle to effectively convey abstract mathematical concepts like Fourier series. Static images and equations can be difficult for students to grasp. This will provide more engaging and interactive learning tools like visualisations and quizzes to improve comprehension.

- **Lack of Personalization**: Every student has unique strengths, weaknesses, and learning styles. Most educational resources are one-size-fits-all. Thus, we will generate personalised study plans and guidance tailored to each student's needs, helping them learn more efficiently.

- **Fragmented Learning Experience**: Students often have to juggle multiple platforms and resources to learn a subject. As a result, we aim to integrate with existing educational tools, providing a seamless learning experience within familiar environments.

- **Difficulty Applying Concepts**: Mastering mathematical theory is only half the battle. Students also need to be able to apply concepts to solve problems. Our interactive quizzes and visualisations will help students bridge the gap between theory and practice.

- **Insufficient Feedback and Guidance**: Without regular feedback and guidance, it's easy for students to develop misconceptions or get stuck on challenging concepts. Our AI-powered study plans and quizzes will provide ongoing support and feedback to keep students on track.

## Backend API Endpoints
1. `admin/` - To navigate to admin site.
2. `user-management/create/` - POST with username, email and password to create the user.
3. `user-management/login/`  - POST with username and password as credentials to obtain token.

>**Note**: The requests below must contain the header: `Authorization: Token <Your token>`, the last endpoint will return the token upon success.

4. `user-management/info/` - GET to obtain information such as username, email, bio, phone number of the currently logged in user (identified by the token).
5. `user-management/update/` - POST with the updated fields to update the specified fields.
6. `user-management/logout/` - POST to logout. The token will no longer be valid after logout.
7. `question-generation/generate/` - POST with the file hash to check if the file already exists in the backend server or not. If it exists the questions will be returned otherwise a status of 201 will be returned, after which the file hash and the file must be sent. Upon success generated questions will be returned.
8. `ocr-expressions/latex/` - POST with the image (file must be an image only) upon success the equivalent latex expression will be returned.

>**Note**: Use key `file` in `files` in the request whenever sending any file(s) to the server.