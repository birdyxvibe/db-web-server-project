import { PrismaClient, User } from '@prisma/client';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import TopBar from '../components/topBar';

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = (async () => {
    const users = await prisma.user.findMany({
        orderBy: [
            {
                Id: 'asc'
            }
        ]
    })
    return { props: { users } }
}) 

type PageProps = {
    users: User[],
}

export default function Page({ users }: PageProps){
    return <div>
                <TopBar userName = "$/directory" color = 'lime' />
                <div style = {{ position: 'absolute', top: '55px', left: '0.4vw' }}>
                {users.map((user, index) => (
                    <div key={index} style={{margin: '10px'}}>
                        - <a href={`/user/${user.Id}`}>UID: {user.Id} // {user.name}<br /></a>
                    </div>
                ))}
                </div>
            </div>
}