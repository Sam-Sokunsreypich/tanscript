'use client'
import { UserType } from '@/type/UserType'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import React from 'react'

async function getAllUser(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}users`)

  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

    const data = await res.json()
    const users: UserType[] = data.users
    return users;
}

export default function UserCard() {
    const {data: users, isLoading, error}= useQuery<UserType[]>({
        queryKey:['users'],
        queryFn: getAllUser,
    
    })
    if(isLoading){
        return <div>Loading ...</div>
    }
    if(error){
        return <div>Error: {error.message}</div>
    }
 
    return (
    <div>
      {
      users?.map((user)=>(
        <section key={user.id} className="mb-2 border p-4 rounded-lg  bg-neutral-100">
    <div className="mx-auto">
        <div className=" ">
            <div className="w-20 h-20 mx-auto mb-6 md:mr-6 flex-shrink-0">
                <Image
                width={80}
                height={80}
                unoptimized
                alt={user.username}
                className="object-cover rounded-full" src={user.image}  />
            </div>
            <div className="flex-grow text-center md:text-left">
                <p className="font-bold">{user.email}</p>
                <h3 className="text-xl heading">{user.username}</h3>
                <p className="mt-2 mb-3">{user.phone}</p>
                <div>
                    <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Discrete Math</span>
                    <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Topology</span> 
                    <span className="bg-gray-200 border px-3 py-1.5 rounded-lg text-sm">Neural Nets</span>
                </div>
            </div>
        </div>
    </div>
</section>
      ))
      }
    </div>
  )
}
