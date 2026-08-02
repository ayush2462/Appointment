import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import {
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Mail,
  Phone,
  User,
  Calendar,
  Eye,
  X,
  RefreshCw,
} from "lucide-react";

const ContactInquiries = () => {
  const {
    contacts,
    getContacts,
    updateContactStatus,
    deleteContactInquiry,
    aToken,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (aToken) {
      getContacts();
    }
  }, [aToken]);

  const handleStatusChange = async (contactId, newStatus) => {
    await updateContactStatus(contactId, newStatus);
  };

  const handleDelete = async (contactId) => {
    setLoading(true);
    const success = await deleteContactInquiry(contactId);
    setLoading(false);
    if (success) {
      setDeleteConfirmId(null);
      if (viewingMessage && viewingMessage._id === contactId) {
        setViewingMessage(null);
      }
    }
  };

  const filteredContacts = contacts.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = contacts.filter((c) => c.status === "Pending").length;
  const respondedCount = contacts.filter((c) => c.status === "Responded").length;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="m-5 w-full max-w-7xl font-sans">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2.5">
            <MessageSquare className="w-7 h-7 text-primary" />
            Patient Contact Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and respond to messages submitted by patients via the website contact form.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={getContacts}
            className="p-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition shadow-xs"
            title="Refresh Inquiries"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Messages
            </p>
            <p className="text-2xl font-bold text-gray-800">{contacts.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Pending Response
            </p>
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Responded
            </p>
            <p className="text-2xl font-bold text-emerald-600">{respondedCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient name, email, or message keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl w-full md:w-auto">
          {["All", "Pending", "Responded", "Archived"].map((st) => {
            const isActive = statusFilter === st;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`flex-1 md:flex-initial px-4 py-1.5 text-xs font-semibold rounded-lg transition ${
                  isActive
                    ? "bg-white text-primary shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inquiries Table / List */}
      {filteredContacts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-6">
          <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No contact inquiries found</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
            {searchQuery || statusFilter !== "All"
              ? "No messages match your current search criteria or status filter."
              : "When patients submit queries through the Contact Us form, they will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Patient Name</th>
                  <th className="py-3.5 px-5">Subject</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredContacts.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-gray-800 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" /> {item.email}
                        </span>
                        {item.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" /> {item.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      <span className="inline-block bg-indigo-50 text-primary text-[11px] font-semibold px-2.5 py-0.5 rounded-md mb-1">
                        {item.subject}
                      </span>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {item.message}
                      </p>
                    </td>

                    <td className="py-4 px-5 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.date)}
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                          item.status === "Responded"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : item.status === "Archived"
                            ? "bg-gray-100 text-gray-600 border-gray-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Responded">Responded</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setViewingMessage(item)}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-primary text-xs font-semibold rounded-lg transition flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Read
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item._id)}
                          className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW MESSAGE MODAL */}
      {viewingMessage && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Patient Inquiry Detail
              </h3>
              <button
                onClick={() => setViewingMessage(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-gray-700">
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-sm">{viewingMessage.name}</span>
                  <span className="text-gray-400 text-[11px]">{formatDate(viewingMessage.date)}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-primary" /> {viewingMessage.email}
                  </span>
                  {viewingMessage.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-primary" /> {viewingMessage.phone}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Category / Subject
                </span>
                <p className="font-bold text-gray-800 text-sm mt-0.5">{viewingMessage.subject}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Full Message
                </span>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {viewingMessage.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500">Status:</span>
                  <select
                    value={viewingMessage.status}
                    onChange={(e) => {
                      const newSt = e.target.value;
                      handleStatusChange(viewingMessage._id, newSt);
                      setViewingMessage({ ...viewingMessage, status: newSt });
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border outline-none bg-white cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Responded">Responded</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${viewingMessage.email}?subject=RE: ${viewingMessage.subject}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-semibold text-xs shadow-xs hover:bg-primary-dark transition flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" /> Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl shadow-xl p-6 border border-gray-100 text-center">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-gray-800">Delete Message?</h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              Are you sure you want to delete this patient contact message record?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition shadow-xs"
              >
                {loading ? "Deleting..." : "Delete Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInquiries;
