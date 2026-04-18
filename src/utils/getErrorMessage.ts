type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

/**
 * Extracts a user-friendly message from RTK Query / Axios style errors.
 * Handles shapes like:
 * - { status, data: { message, err } }
 * - { status, data: "some string" }
 * - Error instances
 */
export function getErrorMessage(err: unknown): string {
  if (!err) return "Something went wrong";

  if (typeof err === "string") return err;

  if (err instanceof Error) return err.message || "Something went wrong";

  if (isRecord(err)) {
    const data = (err as UnknownRecord).data;

    if (typeof data === "string") return data;

    if (isRecord(data)) {
      const message = data.message;
      if (typeof message === "string" && message.trim().length) return message;

      const innerErr = data.err;
      if (typeof innerErr === "string" && innerErr.trim().length) return innerErr;
    }

    const message = (err as UnknownRecord).message;
    if (typeof message === "string" && message.trim().length) return message;
  }

  return "Something went wrong";
}

