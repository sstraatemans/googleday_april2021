# Client

client-server-url/[slug] (die connect naar server/slug)
scherm 1: 'geef naam op' en join
scherm 2: 'wacht scherm, clients (\*tot start)"

scherm 3:ontvang vraag/antwoorden
scherm 4: na antwoord gegeven
scherm 4b: wachtscherm voor volgende vraag (tussenstand)

scherm 3...

tot. alle vragen zijn geweest
wachtscherm 4b (zonder vervolg vraag komend) - "zonder tussenstand"

scherm5: resultaatscherm

# Communicatie

1[client->server] register-client (name: string)
name: RegisterParticipant

1b[client<-server] participants-updated
name: PartipantsUpdated

```
{
  participants: string[]
}
```

1c[admin->server] start game
name: StartGame

2[client<-server] game start
name: GameStarted

3[client<-server] new question
name: NewQuestion

```
{
  question: string;
  answers: {
    id: string;
    displayValue: string;
  }[]
}
```

4[client->server] answer
name: GiveAnswer
{ id: string; participantName: string }

5[client<-server] all questions received
name: QuestionCompleted

```
{
  questionId: string
  validAnswerIds: string[]
  participants: {
    name: string;
    score: number;
  }[]
}
```

3[client<-server] new question (again, until no more questions)
name: NewQuestion

...

# Server

"database"
"een game"

```

{
slug: 'hoofdsteden-in-de-wereld'
name: "Hoofdsteden in de wereld",
questions: [{
id: 'vraag1',
question: "Wat is de hoofdstand van Spanje?",
answers: [
{ id: "antwoord1", displayValue: "Lissabon", validAnswer: false }
{ id: "antwoord2", displayValue: "Madrid", validAnswer: true }
{ id: "antwoord3", displayValue: "Parijs", validAnswer: false }
{ id: "antwoord4", displayValue: "Rome", validAnswer: false }
]
}]
}

```

## status

waiting for clients

## actie

"clients geaccepteerd, start game"

## send

vraag+antwoorden
probeer dit te doen (anders alleen tijd, bijv 20sec)

## volgende status

await alle clients, of timer

wachtscherm voor volgende (live tussenstand)

...etc

```

```
