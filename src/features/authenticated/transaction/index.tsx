import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetTransactionHistoryQuery } from "@/store/api/transactionApi";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const TransactionPage = () => {
  const [page, setPage] = useState(0);
  const limit = 5;
  
  // Calculate offset based on page
  const offset = page * limit;
  
  const { data, isLoading, isFetching, isError } = useGetTransactionHistoryQuery({
    offset,
    limit,
  });

  // Track if there are more items to load
  const [hasMore, setHasMore] = useState(true);
  
  // Update hasMore when data changes
  useEffect(() => {
    if (data?.data) {
      const currentRecordsCount = data.data.records.length;
      const expectedCount = (page + 1) * limit;
      // If we got less records than expected, there's no more data
      setHasMore(currentRecordsCount >= expectedCount);
    }
  }, [data, page, limit]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  
  const handleRefresh = () => {
    setPage(0);
  };

  const getTransactionIcon = (type: string) => {
    return type === "TOPUP" ? (
      <ArrowDownCircle className="text-green-500" size={24} />
    ) : (
      <ArrowUpCircle className="text-red-500" size={24} />
    );
  };

  const getAmountColor = (type: string) => {
    return type === "TOPUP" ? "text-green-600" : "text-red-600";
  };

  const getAmountPrefix = (type: string) => {
    return type === "TOPUP" ? "+" : "-";
  };

  return (
    <div className="mt-10 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Semua Transaksi</h2>
        {page > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isFetching}
          >
            Refresh
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {isLoading && page === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-8">
            <p className="text-red-500">Error loading transactions</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="mt-2"
            >
              Try Again
            </Button>
          </div>
        ) : !data?.data.records || data.data.records.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada transaksi</p>
          </div>
        ) : (
          <>
            {data.data.records.map((transaction, index) => (
              <div
                key={`${transaction.invoice_number}-${index}`}
                className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getTransactionIcon(transaction.transaction_type)}
                    <div>
                      <p className="font-semibold text-sm">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatDate(transaction.created_on)}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Invoice: {transaction.invoice_number}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${getAmountColor(transaction.transaction_type)}`}>
                      {getAmountPrefix(transaction.transaction_type)} {formatCurrency(transaction.total_amount)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {hasMore && !isError && data?.data.records && data.data.records.length > 0 && (
          <Button
            onClick={handleLoadMore}
            variant="ghost"
            className="w-full text-red-500 hover:text-red-600"
            disabled={isFetching}
          >
            {isFetching && page > 0 ? "Loading..." : "Show more"}
          </Button>
        )}
        
        {!hasMore && data?.data.records && data.data.records.length > 0 && (
          <p className="text-center text-sm text-gray-500 py-4">
            No more transactions
          </p>
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
