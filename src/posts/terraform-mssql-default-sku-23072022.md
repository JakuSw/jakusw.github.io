---
title: "Terraform Azure SQL default value trap"
date: "2022-07-23"
---

Last month I had the opportunity to participate in Terraform exam that I passed. It was an interesting experience since a year ago I was Junior .NET and all my knowledge about terraform was that this tool exists. Today I want to tell you about one issue (in my opinion) in Terraform Azure SQL default settings. When we look into the documentation we have an example of creating a standard sku in DTO model. One interesting thing is that sku is optional. If we didn't provide sku Terraform will try to create Gen4/Gen5 capacity depending on location. I think that this type of parameter is really important and should be changed to require to avoid additional expenses. At the end of the day make sure that you know what resources will be created, create budget alerts and avoid additional cloud costs. 

References: 
- [Terraform MS SQL documentation](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/mssql_database)