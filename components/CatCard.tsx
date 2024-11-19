import Image from "next/image";

interface CatCardProps {
  src: string;
  width: number;
  height: number;
}

export default function CatCard(props: CatCardProps) {
  return (
    <div className=" relative w-full h-52 overflow-hidden rounded-lg ">
      <Image
        className=" object-cover "
        src={props.src}
        alt={"cat image"}
        fill
      />
    </div>
  );
}
