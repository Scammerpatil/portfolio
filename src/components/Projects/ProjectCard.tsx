import { ProjectData } from "@/types/Project";
import Image from "next/image";
import formatDate from "@/helper/formatDate";
import Link from "next/link";

const ProjectCard = ({ props }: { props: ProjectData }) => {
  return (
    <Link
      href={`/project?slug=${props.slug}`}
      className="card bg-base-300 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 mb-5 shadow-lg border-2 border-primary hover:shadow-primary w-full lg:h-140"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <figure>
        {props.bannerImage && (
          <Image
            className="shadow-md shadow-primary"
            src={`data:${props.bannerImage.contentType};base64,${Buffer.from(
              props.bannerImage.data
            ).toString("base64")}`}
            alt={props.title as string}
            width={500}
            height={300}
          />
        )}
      </figure>
      <div className="card-body p-4">
        <div className="flex justify-between items-center">
          <h2 className="card-title text-2xl font-bold text-base-content sm:text-xl">
            {props.name} | {props.title}
            {props.liveLink && (
              <span className="badge badge-outline badge-error px-1 ml-2">
                Live
                <span className="mx-1 h-2 w-2 rounded-badge bg-error"></span>
              </span>
            )}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 my-2">
          {Object.entries(props.technologies)
            .flatMap(([stack, techList]) => techList?.technologies || [])
            .slice(0, 9)
            .map((tech, idx) => (
              <span
                key={idx}
                className="badge badge-primary badge-md text-primary-content"
              >
                {tech}
              </span>
            ))}
        </div>
        <p className="text-justify text-base-content/80 text-xs md:text-md">
          {props.desc.split(" ").slice(0, 50).join(" ")}...
        </p>
        <button className="btn btn-primary btn-outline mt-3 rounded-xl">
          Show More
        </button>
        <div className="flex justify-between w-full items-center mt-4 text-base-content">
          <Image
            src="https://avatars.githubusercontent.com/scammerpatil"
            className="rounded-full"
            alt="scammerpatil"
            height={40}
            width={40}
          />
          <span className="ml-2 text-base-content">Scammer Patil</span>
          <p className="px-2"> {formatDate(new Date(props.date!))} </p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
