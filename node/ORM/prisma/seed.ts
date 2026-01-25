import { prisma } from "@/prisma";

async function seed(){
    await prisma.user.createMany({
        data: [
            {
                name: "Rodrigo Silva",
                email: "rodrigo@mail.com"
            },
            {
                name: "Anderson Silva",
                email: "anderson@mail.com"
            },
        ]
    })
}

seed().then(() => {
    console.log("Database seeded!")
    prisma.$disconnect()
})