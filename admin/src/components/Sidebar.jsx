import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  Building2,
  UserPlus,
  Users,
  UserCheck,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  MessageSquare,
  Briefcase,
  FileText,
} from "lucide-react";

const Sidebar = () => {
  const { aToken, contacts } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const pendingInquiriesCount = contacts
    ? contacts.filter((c) => c.status === "Pending").length
    : 0;

  const getNavLinkClass = ({ isActive }) =>
    `group flex items-center justify-between px-4 py-3 rounded-xl mx-3 my-1 transition-all duration-200 cursor-pointer text-sm font-medium ${
      isActive
        ? "bg-primary/10 text-primary font-semibold shadow-sm"
        : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
    }`;

  const getIconWrapperClass = (isActive) =>
    `p-2 rounded-lg transition-colors ${
      isActive
        ? "bg-primary text-white shadow-xs"
        : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-primary group-hover:shadow-xs"
    }`;

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-white border-r border-gray-200/80 flex flex-col justify-between select-none shrink-0 font-sans shadow-xs">
      <div className="py-4">
        {/* Admin Navigation Section */}
        {aToken && (
          <div className="space-y-6">
            {/* Section 1: Overview */}
            <div>
              <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Overview
              </p>
              <nav className="space-y-0.5">
                <NavLink to="/admin-dashboard">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span>Dashboard</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/all-appointments">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <span>Appointments</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>
              </nav>
            </div>

            {/* Section 2: Management & Master */}
            <div>
              <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Management
              </p>
              <nav className="space-y-0.5">
                <NavLink to="/contact-inquiries">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <span>Patient Inquiries</span>
                      </div>
                      {pendingInquiriesCount > 0 ? (
                        <span className="text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                          {pendingInquiriesCount}
                        </span>
                      ) : (
                        isActive && <ChevronRight className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/departments">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <Building2 className="w-4 h-4" />
                        </div>
                        <span>Department Master</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/add-doctor">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <UserPlus className="w-4 h-4" />
                        </div>
                        <span>Add Doctor</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/doctor-list">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <Users className="w-4 h-4" />
                        </div>
                        <span>Doctor Directory</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>
              </nav>
            </div>

            {/* Section 3: Job Portal */}
            <div>
              <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Job Portal
              </p>
              <nav className="space-y-0.5">
                <NavLink to="/job-openings">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <span>Job Openings</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/job-applications">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <FileText className="w-4 h-4" />
                        </div>
                        <span>Job Applications</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>
              </nav>
            </div>
          </div>
        )}

        {/* Doctor Navigation Section */}
        {dToken && (
          <div className="space-y-6">
            <div>
              <p className="px-6 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Doctor Portal
              </p>
              <nav className="space-y-0.5">
                <NavLink to="/doctor-dashboard">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <LayoutDashboard className="w-4 h-4" />
                        </div>
                        <span>Dashboard</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/doctor-appointments">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <CalendarCheck className="w-4 h-4" />
                        </div>
                        <span>Appointments</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>

                <NavLink to="/doctor-profile">
                  {({ isActive }) => (
                    <div className={getNavLinkClass({ isActive })}>
                      <div className="flex items-center gap-3">
                        <div className={getIconWrapperClass(isActive)}>
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <span>My Profile</span>
                      </div>
                      {isActive && <ChevronRight className="w-4 h-4 text-primary" />}
                    </div>
                  )}
                </NavLink>
              </nav>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Footer User Badge */}
      <div className="p-4 m-3 bg-gray-50 rounded-xl border border-gray-200/80 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
          {aToken ? (
            <ShieldCheck className="w-5 h-5 text-primary" />
          ) : (
            <Stethoscope className="w-5 h-5 text-primary" />
          )}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-gray-800 truncate">
            {aToken ? "System Admin" : "Doctor Portal"}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] text-gray-500 font-medium">Session Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
