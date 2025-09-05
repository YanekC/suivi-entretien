import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/list.tsx"),
  route("vehicules/:vehiculeId", "routes/vehicule.tsx"),
  route(
    "vehicules/:vehiculeId/maintenance/:maintenanceId",
    "routes/maintenance.tsx",
  ),
] satisfies RouteConfig;
