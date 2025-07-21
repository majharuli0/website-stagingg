import { createColumnHelper } from "@tanstack/react-table";
import { Download, Undo2 } from "lucide-react";
import React, { useState } from "react";
import { Heading } from "../../components";
import { ReactTable } from "../../components/ReactTable";
import ActionPopover from "./ActionPopover";
import RefundModal from "./RefundModal";

export default function BillingStatus({ transactionDetails }) {
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundTransactionDetails, setRefundTransactionDetails] =
    useState(null);

  const tableData =
    transactionDetails?.data?.map((charge) => {
      const transactionDate = new Date(charge.created * 1000);
      const currentDate = new Date();
      const dateDifference = Math.floor(
        (currentDate - transactionDate) / (1000 * 60 * 60 * 24)
      ); // Calculate date difference in days

      return {
        date: transactionDate.toLocaleDateString(),
        totalAmount: `${(charge.amount / 100).toFixed(
          2
        )} ${charge.currency.toUpperCase()}`,
        status: charge.amount_refunded > 0 ? "Refunded" : charge.status,
        receiptUrl: charge.receipt_url,
        action: charge.payment_intent,
        isActionVisible: dateDifference <= 10, // Only show action if the date difference is less than or equal to 10 days
      };
    }) || [];

  const tableColumnHelper = createColumnHelper();

  const tableColumns = React.useMemo(() => {
    return [
      tableColumnHelper.accessor("chargeId", {
        cell: (info) => (
          <div className="flex flex-col items-start">
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.row.original.date}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Date
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("totalAmount", {
        cell: (info) => (
          <div className="flex items-center">
            <Heading as="p" className="text-[1.00rem] font-normal text-text">
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Total
            </Heading>
          </div>
        ),
        meta: { width: "11.00rem" },
      }),
      tableColumnHelper.accessor("status", {
        cell: (info) => (
          <div className="flex items-center">
            <Heading
              as="p"
              className={`text-[1.00rem] font-normal  capitalize ${
                info.getValue() === "succeeded"
                  ? "!text-green-600"
                  : "!text-red-600"
              }`}
            >
              {info.getValue()}
            </Heading>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Status
            </Heading>
          </div>
        ),
        meta: { width: "8.00rem" },
      }),
      tableColumnHelper.accessor("receiptUrl", {
        cell: (info) => (
          <div className="flex items-center">
            <a
              href={info.getValue()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 cursor-pointer"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>
        ),
        header: (info) => (
          <div className="flex py-[0.50rem] items-center">
            <Heading as="p" className="text-[1.00rem] font-medium text-body">
              Receipt
            </Heading>
          </div>
        ),
        meta: { width: "8.00rem" },
      }),
      tableColumnHelper.accessor("action", {
        cell: (info) => {
          if (!info.row.original.isActionVisible) {
            return null; // Hide action if the item is more than 10 days old
          }

          const options = [
            {
              label: "Refund Request",
              icon: <Undo2 size={18} />,
              onClick: () => {
                setIsRefundModalOpen(true);
                setRefundTransactionDetails(info.row.original);
              },
            },
          ];

          return (
            <ActionPopover
              options={options}
              isOpen={openPopoverIndex === info.row.index}
              onToggle={() =>
                setOpenPopoverIndex(
                  openPopoverIndex === info.row.index ? null : info.row.index
                )
              }
            />
          );
        },
        header: (info) => <></>,
        meta: { width: "8.00rem" },
      }),
    ];
  }, [openPopoverIndex]);

  return (
    <div className="mb-[13.75rem] w-[34.37rem] flex flex-col gap-[2.50rem] md:self-stretch md:w-full">
      <ReactTable
        size="xs"
        bodyProps={{ className: "" }}
        headerCellProps={{ className: "bg-gray-10101" }}
        cellProps={{ className: "border-border border-b border-solid" }}
        columns={tableColumns}
        data={tableData}
      />
      <RefundModal
        isOpen={isRefundModalOpen}
        onOpenChange={setIsRefundModalOpen}
        transactionDetails={refundTransactionDetails}
      />
    </div>
  );
}
