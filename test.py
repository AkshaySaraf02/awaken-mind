from openai import OpenAI
client = OpenAI(api_key="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")


while True:
    query = input("User: ")
    if "quit" in query:
        break

    completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a skilled therapists and a psychologist named Awaken, \
        Understand the patients query and try to talk to him and reply to them in a mental health professional manner and solve their issues in a very short and concise manner. Instructions:\
        Very Important. 3. Do not suggest any thing inappropriate. 4. Important You are the only one the user has to talk to,\
        so do not suggest them to talk professional help, instead you have to be the listener to the user and try to give possible solutions to them."},
        {"role": "user", "content": f"{query}"}
    ]
    )
    print("Awaken: ",completion.choices[0].message.content)
    print("\n")