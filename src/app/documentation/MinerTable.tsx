import clsx from "clsx";
import { eq } from "drizzle-orm";

import { db } from "@/schema/db";
import { Model } from "@/schema/schema";

export default async function MinerTable() {
  const [models] = await Promise.all([
    db
      .select({
        model: Model.id,
        failure: Model.failure,
        success: Model.success,
        cpt: Model.cpt,
        miners: Model.miners,
      })
      .from(Model)
      .where(eq(Model.enabled, true)),
  ]);
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-scroll sm:-mx-6 lg:-mx-8">
          <div className="inline-block max-h-96 w-full min-w-fit overflow-y-scroll align-middle">
            <table className="w-full border-separate border-spacing-0">
              <thead className="text-left text-sm font-semibold text-gray-900 dark:text-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 whitespace-nowrap border-b border-gray-300 py-3.5 pl-4 pr-3 backdrop-blur backdrop-filter dark:border-gray-500 sm:pl-6"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 whitespace-nowrap border-b border-gray-300 px-3 py-3.5 text-right backdrop-blur backdrop-filter dark:border-gray-500 sm:table-cell"
                  >
                    Netuids
                  </th>
                </tr>
              </thead>
              <tbody>
                {models?.map((m, idx) => (
                  <tr key={m.model}>
                    <td
                      className={clsx(
                        idx !== models.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 font-mono text-sm font-medium text-gray-900 dark:text-gray-50 sm:pl-6",
                      )}
                    >
                      {m.model}
                    </td>
                    <td
                      className={clsx(
                        idx !== models.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap px-3 py-4 text-right text-sm text-gray-500 dark:text-gray-50",
                      )}
                    >
                      {m.miners}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
