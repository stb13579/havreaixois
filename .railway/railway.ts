import { defineRailway, github, preserve, project, service } from "railway/iac";
// This repository manages only its own resources in the environment. Other
// repositories export their own partial name.
// See https://docs.railway.com/infrastructure-as-code#multi-repo-projects
export const partial = "havreaixois";
export default defineRailway(() => {
  const havreaixois = service("havreaixois", {
    source: github("stb13579/havreaixois", { branch: "main", checkSuites: true }),
    build: { builder: "DOCKERFILE", dockerfilePath: "Dockerfile" },
    healthcheck: "/api/health/",
    healthcheckTimeout: 100,
    replicas: { "europe-west4-drams3a": 1 },
    deploy: { drainingSeconds: 0, overlapSeconds: 0 },
    domains: ["lehavreaixois.com", "www.lehavreaixois.com"],
    env: { CONTACT_ENDPOINT: preserve(), NEXT_PUBLIC_GA_MEASUREMENT_ID: preserve() },
  });

  return project("Le Havre Aixois", {
    variables: { managed: true },
    resources: [havreaixois],
  });
});
