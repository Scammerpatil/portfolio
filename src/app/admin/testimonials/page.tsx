"use client";

import Title from "@/components/Common/Title";
import Loading from "@/components/Loading";
import { Testimonial } from "@/types/Testimonial";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  IconCancel,
  IconEdit,
  IconPlus,
  IconRestore,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/review/get-reviews");
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const res = axios.delete(`/api/review/delete?id=${id}`);
      toast.promise(res, {
        loading: "Deleting review...",
        success: () => {
          setReviews((prev) => prev.filter((r) => r._id !== id));
          return "Review deleted successfully!";
        },
        error: () => "Failed to delete review",
      });
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error("An error occurred while deleting the review.");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingReview) return;
    const formData = new FormData();
    formData.append("name", editingReview.name);
    formData.append("email", editingReview.email);
    formData.append("linkedIn", editingReview.linkedIn);
    formData.append("designation", editingReview.designation);
    formData.append("content", editingReview.content);
    formData.append("currentEmployer", editingReview.currentEmployer);
    formData.append("currentPosition", editingReview.currentPosition);
    formData.append("star", editingReview.star.toString());
    formData.append("reviewId", editingReview._id!);
    if (file) {
      formData.append("image", file);
    }
    try {
      const res = axios.put(`/api/review/update-review`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.promise(res, {
        loading: "Updating testimonial...",
        success: () => {
          fetchTestimonials();
          return "Testimonial updated successfully!";
        },
        error: () => "Failed to update testimonial",
      });
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast.error("An error occurred while updating the testimonial.");
    }
  };
  const handleApproveReview = async (id: string) => {
    try {
      const res = axios.put(`/api/review/approve-review?id=${id}`);
      toast.promise(res, {
        loading: "Approving review...",
        success: () => {
          setReviews((prev) =>
            prev.map((r) => (r._id === id ? { ...r, approved: true } : r))
          );
          return "Review approved successfully!";
        },
        error: () => "Failed to approve review",
      });
    } catch (error) {
      console.error("Error approving review:", error);
      toast.error("An error occurred while approving the review.");
    }
  };
  if (loading) return <Loading />;

  return (
    <>
      <Title
        title="Testimonials Management"
        subTitle="Manage user-submitted testimonials."
      />

      <div className="px-6 mt-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card shadow-lg compact bg-base-300"
            >
              {review.image && review.image.data && (
                <Image
                  src={`data:${review.image.contentType};base64,${Buffer.from(
                    review.image.data
                  ).toString("base64")}`}
                  alt={review.name}
                  height={192}
                  width={384}
                  className="w-full h-48 object-contain"
                />
              )}

              <div className="card-body">
                <h3 className="card-title">
                  {review.name} | {review.designation}
                </h3>
                <p className="italic">{review.content}</p>

                <p className="text-sm text-base-content mt-2">
                  ⭐ {review.star}/5 | {review.currentEmployer}
                </p>

                <div className="card-actions justify-end mt-3">
                  {review.approved ? (
                    <button className="btn btn-success btn-sm">Approved</button>
                  ) : (
                    <button
                      className="btn btn-warning btn-outline btn-sm"
                      onClick={() => {
                        handleApproveReview(review._id!);
                      }}
                    >
                      Pending
                    </button>
                  )}
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => {
                      setEditingReview(review);
                      (
                        document.getElementById(
                          "edit-testimonial-modal"
                        ) as HTMLDialogElement
                      ).showModal();
                    }}
                  >
                    <IconEdit size={18} /> Edit
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteReview(review._id!)}
                  >
                    <IconTrash size={18} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <dialog
        id="edit-testimonial-modal"
        className="modal bg-base-100/70 backdrop-blur-lg opacity-100"
      >
        <Toaster />
        <div className="modal-box max-w-6xl bg-base-100 backdrop-blur-lg">
          <h3 className="font-bold text-2xl text-primary text-center py-2">
            Edit Testimonial
          </h3>
          <div className="px-10 py-5 mx-auto bg-base-200 rounded-lg">
            <h1 className="border-b text-lg font-bold mb-4">
              Testimonial Details
            </h1>
            <div className="grid grid-cols-2 gap-4 my-4">
              {/* Testimonial Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Name <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the name"
                  value={editingReview?.name || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      name: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/*Testimonial Contact Email  */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Email <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the Testimonial email"
                  value={editingReview?.email || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      email: e.target.value.toLowerCase().trim() || "",
                    })
                  }
                />
              </fieldset>
              {/* Testimonial LinkedIn */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  LinkedIn <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  placeholder="Enter the LinkedIn profile URL"
                  value={editingReview?.linkedIn || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      linkedIn: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Testimonial Designation */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Designation <span className="text-error">*</span>{" "}
                </legend>
                <select
                  className="select select-bordered w-full px-2"
                  value={editingReview?.designation || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      designation: e.target.value,
                    })
                  }
                >
                  <option value="" defaultChecked>
                    Select Designation
                  </option>
                  {["Friend 🤗", "Colleague 👩‍💻", "Client 💼", "Manager 👨‍💼"].map(
                    (designation) => (
                      <option
                        key={designation}
                        value={designation.toLowerCase()}
                      >
                        {designation}
                      </option>
                    )
                  )}
                </select>
              </fieldset>
              {/* Testimonial Content */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Review Content <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the Review content"
                  value={editingReview?.content || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      content: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Testimonial Current Employer */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Current Employer <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the Current Employer"
                  value={editingReview?.currentEmployer || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      currentEmployer: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Testimonial Current Position */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Current Position <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Enter the Current Position"
                  value={editingReview?.currentPosition || ""}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      currentPosition: e.target.value,
                    })
                  }
                />
              </fieldset>
              {/* Star Rating */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Star Rating <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="input input-bordered w-full"
                  placeholder="Enter the Star Rating"
                  value={editingReview?.star || 1}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview!,
                      star: Number(e.target.value),
                    })
                  }
                />
              </fieldset>
              {/* Testimonial Profile Image */}
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">
                  Profile Image
                  <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full join-item"
                  accept="image/jpg, image/jpeg, image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFile(file);
                    }
                  }}
                />
              </fieldset>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-4">
              <button
                className="btn btn-error btn-outline"
                onClick={() => window.location.reload()}
              >
                <IconRestore size={16} className="mr-2" />
                Reset
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleSaveEdit()}
              >
                <IconPlus size={16} className="mr-2" />
                Submit
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  (
                    document.getElementById(
                      "edit-testimonial-modal"
                    ) as HTMLDialogElement
                  ).close();
                }}
              >
                <IconCancel size={16} className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
