"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProjectData } from "@/types/Project";
import {
  IconHeart,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";

export default function ProjectInfoPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<ProjectData>();
  const [comment, setComment] = useState("");
  const [updatingLike, setUpdatingLike] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      setShareUrl(
        encodeURIComponent(`${window.location.origin}/project?slug=${slug}`)
      );
      fetchProject();
    }
  }, [slug]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/project/getProject", {
        slug: encodeURIComponent(slug!),
      });
      setProject(res.data.project);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load project data.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!project || updatingLike) return;
    setUpdatingLike(true);
    try {
      const res = await axios.post("/api/project/like", { slug: project.slug });
      setProject({ ...project, likes: res.data.likes });
    } catch {
      toast.error("Failed to update like!");
    } finally {
      setUpdatingLike(false);
    }
  };

  const handleComment = async () => {
    if (!comment.trim() || !project) return toast.error("Add a comment!");
    try {
      const res = await axios.post("/api/project/comment", {
        slug: project.slug,
        comment,
      });
      setProject({ ...project, comments: res.data.comments });
      setComment("");
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment.");
    }
  };

  if (loading || !project) {
    return (
      <>
        <Navbar className="" />
        <div className="min-h-screen">
          <Loading />
        </div>
      </>
    );
  }

  const shareText = encodeURIComponent(
    `Check out this project: ${project.title}`
  );

  const SectionTitle = ({ title }: { title: string }) => (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="text-2xl font-bold text-primary py-2 bg-primary/10 border-b rounded-t-md text-center"
    >
      {title}
    </motion.h2>
  );

  return (
    <>
      <Navbar className="" />
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* Banner */}
        {project.bannerImage && (
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={`data:${project.bannerImage.contentType};base64,${Buffer.from(
              project.bannerImage.data
            ).toString("base64")}`}
            alt={project.title}
            className="w-full h-56 sm:h-72 md:h-80 lg:h-96 object-cover max-w-6xl mx-auto rounded-b-md shadow-md"
          />
        )}

        {/* Content */}
        <div className="mx-auto px-4 sm:px-6 md:px-10 py-10 max-w-6xl space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary text-center">
              {project.name} | {project.title}
            </h1>
            <p className="text-base md:text-xl py-4 text-center">
              {project.desc}
            </p>
          </motion.div>

          {/* Industry & Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <SectionTitle title="Industry & Stack" />
            <ul className="flex flex-row justify-around gap-3 mt-4 text-base md:text-xl">
              <li>
                <strong>Industry:</strong> {project.industry}
              </li>
              <li>
                <strong>Stack:</strong> {project.stack}
              </li>
            </ul>
          </motion.div>

          {/* Screenshots */}
          {project.images?.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <SectionTitle title="Project Screenshots" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {project.images.length > 0 ? (
                  project.images.map((image, i) => (
                    <motion.img
                      key={i}
                      src={`data:${image.contentType};base64,${Buffer.from(
                        image.data
                      ).toString("base64")}`}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-48 object-cover rounded-md shadow"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-3 opacity-60">
                    No screenshots available.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Challenge & Solution */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <SectionTitle title="Challenge" />
            <p className="text-base md:text-lg text-justify">
              {project.challenge}
            </p>
            <SectionTitle title="Solution" />
            <p className="text-base md:text-lg text-justify">
              {project.solution}
            </p>
          </motion.div>

          {/* Technologies */}
          <div>
            <SectionTitle title="Technologies Used" />
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {project.technologies?.map((tech, i) => (
                <li key={i} className="text-base md:text-lg">
                  <div className="flex gap-2">
                    <span className="font-semibold capitalize">
                      {tech.stack}:
                    </span>
                    <span>{tech.technologies.join(", ")}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <SectionTitle title="Key Features" />
            <ul className="list-disc ml-6 mt-2 space-y-1 text-base md:text-lg">
              {project.features.map((f, i) => (
                <li key={i}>
                  <strong>{f.split(":")[0]}</strong>: {f.split(":")[1]}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-outline btn-secondary ${
                !project.liveLink ? "col-span-2" : ""
              }`}
            >
              View on GitHub
            </a>
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live Demo
              </a>
            )}
          </div>

          {/* Testimonial */}
          {project.testimonial?.clientFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="mt-10"
            >
              <h2 className="text-xl font-semibold">Client Testimonial</h2>
              <blockquote className="italic mt-3 border-l-4 border-primary pl-4">
                “{project.testimonial.clientFeedback}”
              </blockquote>
              <p className="mt-2 opacity-70">
                — {project.testimonial.clientName}
              </p>
            </motion.div>
          )}

          {/* Likes, Shares, Comments */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mt-10 flex flex-col gap-4 border-t pt-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleLike}
                className="btn btn-outline flex items-center gap-2"
              >
                <IconHeart size={18} />
                {project.likes} Likes
              </button>

              <div className="flex gap-4 text-base-content">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandTwitter size={28} />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandLinkedin size={28} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandFacebook size={28} />
                </a>
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconBrandWhatsapp size={28} />
                </a>
              </div>
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold">Comments</h3>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment..."
                  className="input input-bordered grow w-full"
                />
                <button onClick={handleComment} className="btn btn-primary">
                  Post
                </button>
              </div>

              <div className="mt-4 space-y-3 bg-base-200 p-4 rounded-md">
                {project.comments?.length ? (
                  project.comments.map((c, i) => (
                    <div className="chat chat-start" key={i}>
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            alt={`${c.user} avatar`}
                            src="/user-avatar.png"
                          />
                        </div>
                      </div>
                      <div className="chat-header flex items-center gap-2">
                        {c.user}
                        <time className="text-xs opacity-60">
                          {new Date(c.date).toLocaleTimeString()}
                        </time>
                      </div>
                      <div className="chat-bubble text-base">{c.comment}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-center opacity-60">No comments yet.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
