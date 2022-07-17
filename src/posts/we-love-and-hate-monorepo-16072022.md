---
title: "We love and hate monorepo"
date: "2022-07-14"
---

Monorepo is well-known concept for versioning our projects. But what to do if our organization is large? Many big tech companies use monorepo and this is the most common argument for monorepo. But it is worth mentioning that [Google](https://dl.acm.org/doi/pdf/10.1145/2854146) have a dedicated tool for it. On the other hand from DevOps perspective creating pipelines with monorepo is very easy, we have all files in one repo.

Should you use monorepo? For small-scale projects, it could be useful to have frontend and backend in one repo (especially when you have fullstacks in a team), but on a larger scale, I would avoid using monorepo.