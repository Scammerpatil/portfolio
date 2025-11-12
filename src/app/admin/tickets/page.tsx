"use client";
import Title from "@/components/Common/Title";
import { Ticket } from "@/types/Ticket";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const fetchTickets = async () => {
    const response = await fetch("/api/tickets");
    const data = await response.json();
    setTickets(data);
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
    const res = axios.put("/api/tickets/updateStatus", {
      ticketId,
      status: newStatus,
    });
    toast.promise(res, {
      loading: "Updating...",
      success: "Updated successfully!",
      error: "Error updating!",
    });
    fetchTickets();
  };

  return (
    <>
      <Title
        title="Tickets Management"
        subTitle="Manage user-submitted tickets."
      />
      <div className="overflow-x-auto bg-base-300 mx-10 rounded-2xl">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No tickets found
                </td>
              </tr>
            ) : (
              tickets.map((ticket, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{ticket.name}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.message}</td>
                  <td>
                    <span
                      className={`capitalize badge ${
                        ticket.status === "open"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-accent">View</button>
                  </td>
                  <td>
                    {ticket.status === "open" ||
                    ticket.status === "in-progress" ? (
                      <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) =>
                          handleStatusChange(ticket._id, e.target.value)
                        }
                        defaultValue=""
                      >
                        <option>Update the Status</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    ) : (
                      <span className="text-base-content/60 capitalize">
                        {ticket.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
