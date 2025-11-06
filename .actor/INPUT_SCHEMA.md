# Input Schema Documentation

This document provides detailed information about the input schema for the Invoice Generator API Actor.

## Schema Overview

The input schema is defined in `.actor/input_schema.json` and follows the Apify Actor input schema specification (version 1).

## Required Fields

### companyInfo (object)
Your company information that will appear on the invoice.

**Required subfield:**
- `name` (string): Your company name

**Optional subfields:**
- `address` (string): Company street address
- `city` (string): City
- `state` (string): State or province
- `zipCode` (string): ZIP or postal code
- `country` (string): Country
- `email` (string): Company email
- `phone` (string): Company phone number
- `website` (string): Company website
- `logo` (string): URL to company logo image
- `taxId` (string): Tax ID or VAT number

### clientInfo (object)
Client or customer information.

**Required subfield:**
- `name` (string): Client name

**Optional subfields:**
- `address` (string): Client street address
- `city` (string): City
- `state` (string): State or province
- `zipCode` (string): ZIP or postal code
- `country` (string): Country
- `email` (string): Client email
- `phone` (string): Client phone number

### items (array of objects)
List of invoice line items.

**Required subfields for each item:**
- `description` (string): Item or service description
- `quantity` (number): Quantity (must be > 0)
- `unitPrice` (number): Price per unit (must be >= 0)

**Optional subfield:**
- `unit` (string): Unit of measurement (default: "units")

## Optional Top-Level Fields

### invoiceDetails (object)
Invoice metadata and settings.

All subfields are optional:
- `invoiceNumber` (string): Invoice number (auto-generated if not provided)
- `invoiceDate` (string): Invoice date in YYYY-MM-DD format (defaults to today)
- `dueDate` (string): Due date in YYYY-MM-DD format
- `dueDays` (integer): Days until payment is due (alternative to dueDate, default: 30)
- `currency` (string): ISO 4217 currency code (default: "USD")
  - Options: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR
- `taxRate` (number): Tax percentage (e.g., 10 for 10%, default: 0)
- `discountRate` (number): Discount percentage (e.g., 5 for 5%, default: 0)
- `notes` (string): Additional notes or payment terms
- `purchaseOrder` (string): Purchase order number

### paymentTerms (object)
Payment information and banking details.

All subfields are optional:
- `bankName` (string): Name of the bank
- `accountNumber` (string): Bank account number
- `routingNumber` (string): Routing number or SWIFT code
- `paymentMethods` (array of strings): Accepted payment methods

### customFields (array of objects)
Additional custom fields to display on the invoice.

Each object has:
- `label` (string): Field label
- `value` (string): Field value

### outputFormats (array of strings)
Select which file formats to generate.

- Options: "PDF", "HTML", "JSON"
- Default: ["PDF", "JSON"]
- At least one format is required

### template (string)
Invoice template style to use.

- Options: "modern", "classic", "minimal", "professional"
- Default: "modern"

## Validation Rules

1. **Company name** is required
2. **Client name** is required
3. At least **one invoice item** is required
4. Item quantities must be **positive numbers**
5. Item prices must be **non-negative numbers**
6. Dates must be in **YYYY-MM-DD format**
7. Currency codes must be from the **supported list**
8. Tax and discount rates must be **numbers**
9. At least **one output format** must be selected

## Examples

See the `/examples` directory for complete working examples:
- `simple-invoice.json` - Minimal required fields only
- `complete-invoice.json` - All fields populated
- `invoice-with-discount.json` - Using discount feature
- `freelancer-invoice.json` - Freelancer use case
- `multi-currency-invoice.json` - International invoice

## Default Values

When optional fields are not provided, the Actor uses these defaults:

- **Invoice Number**: Auto-generated as `INV-YYYYMM-XXXX`
- **Invoice Date**: Current date
- **Due Date**: Invoice date + 30 days (or + dueDays if specified)
- **Currency**: USD
- **Tax Rate**: 0%
- **Discount Rate**: 0%
- **Item Unit**: "units"
- **Output Formats**: ["PDF", "JSON"]
- **Template**: "modern"

## Tips

1. Always provide complete company and client information for professional invoices
2. Use the `dueDays` field instead of manually calculating `dueDate`
3. Include `notes` with payment instructions and terms
4. Add `customFields` for project-specific information
5. Use `purchaseOrder` for client reference numbers
6. Test with `simple-invoice.json` first before creating complex invoices
