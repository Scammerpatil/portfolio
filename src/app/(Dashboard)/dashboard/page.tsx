// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface Skill {
//   name: string;
//   iconUrl: string;
// }

// const fetchImage = async (url: string) => {
//   try {
//     const response = await fetch(url, { method: "HEAD" });
//     return response.ok;
//   } catch {
//     return false;
//   }
// };

// const Icon = ({ skill }: { skill: Skill }) => {
//   const [iconSrc, setIconSrc] = useState("");

//   useEffect(() => {
//     const checkIconSource = async () => {
//       const deviconUrl = `https://cdn.jsdelivr.net/npm/devicon/icons/${skill.iconUrl}`;
//       const simpleIconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/${skill.iconUrl}`;

//       if (await fetchImage(deviconUrl)) {
//         setIconSrc(deviconUrl);
//       } else if (await fetchImage(simpleIconUrl)) {
//         setIconSrc(simpleIconUrl);
//       } else {
//         console.warn(`Icon not found for: ${skill.name}`);
//         setIconSrc(""); // Optional fallback image or leave blank
//       }
//     };

//     checkIconSource();
//   }, [skill]);

//   return iconSrc ? (
//     <Image
//       className="w-[48px] bs-mx:w-[36px] xsm-mx:w-[28px] !p-1"
//       src={iconSrc}
//       alt={`${skill.name} icon`}
//       width={48}
//       height={48}
//     />
//   ) : (
//     <div className="w-[48px] h-[48px] flex justify-center items-center bg-gray-200 text-gray-500 text-sm">
//       {skill.name}
//     </div>
//   );
// };

// const SkillBadge = (skills: Skill[]) => {
//   return skills.map((skill: Skill, index: number) => (
//     <div
//       key={index}
//       className="flex gap-2 border border-textColor rounded-2xl items-center py-2 px-3 bs-mx:py-0 bs-mx:px-1.5 bs-mx:gap-1 mb-1"
//     >
//       <Icon skill={skill} />
//       <div className="text-textColor text-xl font-medium sm-mx:text-lg xs-mx:text-sm">
//         {skill.name}
//       </div>
//     </div>
//   ));
// };

// const SkillCard = (props: { title: string; skills: Skill[] }) => {
//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="800"
//       data-aos-easing="ease-in-sine"
//       className="w-[47%] shadow-[0_0_10px_0_#64FFDA50] rounded-3xl mb-3 border border-primaryColor p-5 bs-mx:p-3 sm-mx:w-full"
//     >
//       <div className="text-3xl mb-4 text-white text-center sm-mx:text-2xl xs-mx:text-xal font-bold">
//         {props.title}
//       </div>
//       <div className="flex gap-3 bs-mx:gap-2 justify-center flex-wrap">
//         {SkillBadge(props.skills)}
//       </div>
//     </div>
//   );
// };

// export default SkillCard;

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
