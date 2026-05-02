export const projects = [
  {
    name: "Primas OJ",
    description: "An online judge system for competitive programming contests with features like contest creation, submission handling, and judging solutions written in C, C++, and Python. Built using Next.js, Golang, Docker, and WebSocket.",
    link: "https://github.com/md-tuhin-hasnat/primas-oj",
    abstract: "A robust online judging infrastructure engineered for large-scale competitive programming contests. The system orchestrates high-speed code execution within isolated Docker containers to ensure security and deterministic performance metrics across C++, C, and Python runtimes.",
    methodology: [
      "Containerized Sandboxing: Utilizing Docker to provide process isolation and resource limiting (CPU, Memory, Disk I/O) for untrusted user code.",
      "Asynchronous Task Distribution: Implemented a Golang-based judge worker that processes submissions from a message queue for high availability.",
      "Real-time Telemetry: WebSocket-driven updates for live contest standing and submission status.",
      "Dynamic Resource Allocation: Optimized judge nodes to handle peak submission loads during active contests."
    ],
    architecture: ["Next.js (Frontend)", "Golang (Judge Core)", "Docker (Sandbox)", "WebSocket (Streaming)", "PostgreSQL (Persistence)"],
    status: "ACTIVE",
    runtime: "V8 / NODE"
  },
  {
    name: "MessMaster",
    description: "A multi-user mess management system to track expenses, meals, and user roles. Includes real-time notifications for join requests, events, and messages. Built using Next.js, Express.js, and Passport.js.",
    link: "https://github.com/md-tuhin-hasnat/messify",
    abstract: "A centralized ERP solution for multi-tenant residential management. The system streamlines complex expense reconciliation, meal tracking, and role-based access control, providing a high-integrity ledger for shared living environments.",
    methodology: [
      "Role-Based Access Control (RBAC): Hierarchical permission system for Managers, Members, and Admins.",
      "Event-Driven Notifications: Integrated real-time alerting for financial transactions and system events.",
      "Optimistic Concurrency Control: Handling simultaneous meal entries and expense updates to maintain data consistency.",
      "Scalable REST API: Express.js backend optimized for high-frequency mobile and web requests."
    ],
    architecture: ["Next.js (UI)", "Express.js (API)", "Passport.js (Auth)", "MongoDB (Data)", "Tailwind CSS (UX)"],
    status: "ACTIVE",
    runtime: "V8 / NODE"
  }
];
