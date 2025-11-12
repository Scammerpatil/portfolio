"use client";

import Title from "@/components/Common/Title";
import Loading from "@/components/Loading";
import formatDate from "@/helper/formatDate";
import { ServiceRequest } from "@/types/ServiceRequest";
import { useEffect, useState } from "react";

export default function ServiceRequestsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);

  const fetchServiceRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/service-request");
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        console.error("Failed to fetch service requests");
      }
    } catch (error) {
      console.error("Error fetching service requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <Title title="Service Requests" subTitle="Manage all service requests" />

      <div className="mt-10 overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-300 mx-10">
        {requests.length === 0 ? (
          <div className="p-8 text-center text-base-content/70">
            🚫 No service requests found
          </div>
        ) : (
          <table className="table table-zebra w-full bg-base-300">
            {/* ---------- Table Header ---------- */}
            <thead>
              <tr>
                <th>#</th>
                <th>👤 Client</th>
                <th>📧 Email</th>
                <th>💼 Project Title</th>
                <th>💬 Communication</th>
                <th>💵 Budget</th>
                <th>⚙️ Complexity</th>
                <th>📅 Submitted</th>
                <th>🔍 View</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, index) => (
                <tr
                  key={req._id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td>{index + 1}</td>
                  <td className="font-semibold">{req.fullName}</td>
                  <td>{req.email}</td>
                  <td>{req.projectTitle}</td>
                  <td>{req.preferredCommunication || "Email"}</td>
                  <td>{req.budget || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        req.projectComplexity === "Advanced"
                          ? "badge-error"
                          : req.projectComplexity === "Intermediate"
                          ? "badge-warning"
                          : "badge-success"
                      } badge-outline`}
                    >
                      {req.projectComplexity}
                    </span>
                  </td>
                  <td>
                    {req.createdAt ? formatDate(new Date(req.createdAt)) : "—"}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => alert(JSON.stringify(req, null, 2))}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
