import React from "react"
import { Head } from "next/document"

import HomeComponent from "../../../components/HomeComponent"

const Dashboard = (props) => {
    return (
        <>
            <Head>
                <title>
                    Home
                </title>
            </Head>
            <HomeComponent></HomeComponent>
        </>
    )
}

export default Dashboard