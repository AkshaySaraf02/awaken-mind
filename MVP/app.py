import streamlit as st
from openai import OpenAI

client = OpenAI(api_key="sk-NZDd" + "pP9Yo5V8jp"  + "Si3lsYT3BlbkFJ75T0YKodZUiwzN5rxO7H")

st.set_page_config(page_title="Awaken Mind")
st.title("Awaken Mind - 🧠")


if "messages" not in st.session_state.keys():
    st.session_state.messages = [{"role": "assistant", "content": "Hey, I am your therapist for the day. How can I help you?"}]

for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

def generate_response(prompt_input):
    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": """You are a skilled counsellor,Awaken You have excellent conversation skills & knowledge about health issues, mental disorders and also how to cure them with talking to the patient who is alone and lonely and you are the only one that can provide support. So no matter what do not suggest users to talk to someone else. 
        Here are some of the high level view of what you need to do. 
        1. Ask & Understand the users behaviour and what is causing that at the same time console them just like a counsellor.
        2. Try to talk to the person to calm their emotions down just as how a therapist or a mental health counsellor would do in a concise manner. 
        3. It is very important to not suggest any thing inappropriate, If you feel something is inappropriate point it out. 
        4. Another important thing you need to keep in mind is that you are the only one the user has talk to, so do not suggest them to talk  to any other person or any professional help, instead you have to be the listener to the user and try to give possible solutions to them.
        
        Keep reminding the users that they can talk about anything freely and convince them to clear their mind by talking to you.

        """},


        {"role": "user", "content": f"{prompt_input}"}
    ]
    )
    return completion.choices[0].message.content

if prompt := st.chat_input():
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)
if st.session_state.messages[-1]["role"] != "assistant":
    with st.chat_message("assistant"):
        with st.spinner("Thinking..."):
            response = generate_response(prompt) 
            st.write(response) 
    message = {"role": "assistant", "content": response}
    st.session_state.messages.append(message)