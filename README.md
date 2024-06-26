# Localized Chatbot for Banking domain

The Localized Chatbot for Bank Customer Care project aims to develop an intelligent and interactive chatbot system to enhance customer support services for users who communicate in the native Sri Lankan (Sinhala or Tamil) language. This innovative chatbot will serve as a virtual assistant, providing quick and efficient assistance to customers seeking information regarding various banking services, account-related queries, and general inquiries.

- Language Adaptability: The primary objective of this project is to build a chatbot that can seamlessly understand and respond in either Sinhala or Tamil language. By ensuring linguistic fluency, the chatbot will enable users to interact comfortably and receive accurate and contextually appropriate responses.

- Automated Customer Support: The chatbot will act as a virtual customer support representative, automating responses to frequently asked questions and routine inquiries. By leveraging natural language processing (NLP) techniques, the chatbot will provide instant and accurate information on topics such as account balances, transaction history, loan applications, card services, and other common banking processes.

- Personalization and Context Awareness: To enhance customer satisfaction, the chatbot will be designed to recognize returning customers and retrieve their historical data. This will enable personalized assistance based on individual preferences and past interactions, creating a more personalized and engaging customer experience.

- Security and Compliance: Data security and privacy will be of paramount importance. The chatbot will be developed with robust encryption protocols to protect customer information and adhere to banking regulations and privacy laws.

- 24/7 Service:This chatbot is capable of providing 24 hour service and reduces workload for the bank staff. This will enable customers to interact with the bank even when the bank staff are not available.

## Group Members

- Sanujen Premkumar(200583P)
- Joel Sathiyendra Thiyaheswaran(200590J)
- Sandaruth Siriwardana(200607V)

## Features

- Can be used in Sinhala or Tamil or English.
- Connected to real time database. Users can ask questions about their account details.
- Users can ask questions about the bank services. The static data (i.e Data which does not change with time. Eg. Bank account opening procedures, loan procedures, bank history etc.) is stored in the vector database.
- Chatbot is restricted to the banking domain. It will not answer questions which are not related to banking.
  (Sometimes, the LLM might hallucinate and answer questions which are not related to banking. We are working on it)

# Out Chat-bot

<!-- put the images related to chatbot from ./images -->

![dash1](./images/chat_1.jpg)
![dash2](./images/chat_2.jpg)
![dash3](./images/chat_3.jpg)

# Running the frontend

## Swith to the frontend folder
``` bash
cd frontend
```

## Install the dependencies
``` bash
npm install
```

## run the frontend
``` bash
npm run dev
```

# Running the backend

Navigate to the backend [here](https://github.com/joelsathi/FinalProject)

Follow the instructions to run the backend

# Running the dashboard

## Go to the folder
``` bash
cd dashboard
```

## Create a virtual environment
``` bash
python -m venv env
./env/Scripts/activate
```

## Install the dependencies
``` bash
pip install -r requirements.txt
```

## Run the dashboard
``` bash
streamlit run dashboard.py
```

# Reference
We have used the following resources to build the chatbot frontend.

Thank you [IndianCoders](https://youtube.com/@IndianCoders?si=bRB_aStswsKtngRC)

