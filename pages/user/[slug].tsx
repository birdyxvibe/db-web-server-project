import { useState } from 'react'
import { PrismaClient, User, Dog } from '@prisma/client';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import TopBar from '../../components/topBar'
import ButtonPanel from "../../components/buttonPanel"

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = (async (context: GetServerSidePropsContext) => {
    const { slug } = context.params as { slug: string }

    const user = await prisma.user.findUnique({
        where: {
            Id: Number(slug)
        }
    }).catch((err) => {
        return { Id: 0, name: "None", headerColor: "blue" }
    })

    let dogs: Dog[] = [];

    dogs = await prisma.dog.findMany({
        where: {
            ownerId: Number(slug)
        }
    }).catch((err) => {
        return [];
    })

    return { props: { user, dogs } }
})

type PageProps = {
    user: User,
    dogs: Dog[]
}

export default function Page({ user, dogs }: PageProps){
    if(user.Id == 0){
        return <p> User Not Found. Try another ID or <a href="/user" style={{textDecoration: 'underline', color: 'blue'}}>go home</a>. </p>
    }

    let dogsOutput: string = dogs.length > 0 ? "\n" : "None"
    for(const dog of dogs){
        dogsOutput += `- ID: ${dog.Id} | Name: ${dog.name} | Breed: ${dog.breed}\n`
    }

    const [headerColor, setHeaderColor] = useState<string>(user.headerColor)

    const changeColor = async (color: string) => {
        setHeaderColor(color)

        let request = await fetch('http://localhost:3000/api/saveHeaderColor', {
            method: 'POST',
            body: JSON.stringify({ userID: user.Id, color }),
            headers: { 'Content-Type': 'applications/json'}
        })
    }

    return <div style = {{ whiteSpace: 'pre-line', marginLeft: '1px'}}>
            <a href="/user" style={{ position: 'absolute', left: '1vw', top: '17px', zIndex: 2500, marginBottom: '1px', display: 'block', textDecoration: 'underline', color: headerColor == "yellow" || headerColor == "silver" ? 'black' : 'white' }}> 📁 ./directory </a><br />
            <TopBar userName = {user.name} color = {headerColor} />
            <ButtonPanel changeColor={changeColor}/>
            <p style = {{ position: 'absolute', gap: '15px', top: '62px', right: '1vw', zIndex: 1000 }}> 🎨 function changeHeaderColor(user: User, color: string) </p>
            <div style={{ position: 'absolute', top: '62px', left: '0.4vw' }}>
                <p> User ID: {user.Id} </p>
                <p> Dogs: {dogsOutput} </p>
            </div>
           </div>
}

