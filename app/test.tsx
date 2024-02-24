"use client";

export interface TestProps {
    data: any[];
}

export default function Test(props: TestProps) {
    console.log(props.data[0]);
    return <></>;
}
