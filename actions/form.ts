"use server"

import { currentUser } from "@clerk/nextjs/server"
import prisma from "../lib/prisma";
import { ICreateForm } from "../components/CreateFormButton";
class UserNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotFoundError"
    }
}
export async function getFormStats() {
    const user = await currentUser();

    if (!user) {
        throw new UserNotFoundError("User not found")
    }

    const stats = prisma.form.aggregate({
        where: {
            userId: user.id
        },
        _sum: {
            visits: true,
            submissions: true
        }
    })

    const visits = (await stats)._sum.visits || 0
    const submissions = (await stats)._sum.submissions || 0
    let submissionRate = 0

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100
    }

    const bounceRate = 100 - submissionRate

    return { visits, submissions, submissionRate, bounceRate }
}

export async function createForm(data: ICreateForm) {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundError("User not found")
    }
    const { name, description } = data
    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description
        }
    })
    if (!form) {
        throw new Error("something went wrong")
    }
    return form.id
}
export async function getForms() {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundError("User not found")
    }
    return await prisma.form.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}
export async function getFormById(id: number) {
    const user = await currentUser()
    if (!user) {
        throw new UserNotFoundError("User not found")
    }
    return await prisma.form.findUnique({
        where: {
            userId: user.id,
            id
        }
    })
}