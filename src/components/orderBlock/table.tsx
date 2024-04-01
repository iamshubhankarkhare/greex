import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
const orders = [
  {
    pair: 'BTC/USDT',
    type: 'LIMIT',
    side: 'BUY',
    price: '$35,000.00',
    amount: '0.001',
    filled: '0.001',
    time: '2024-04-01 12:00:00',
  },
  {
    pair: 'ETH/USDT',
    type: 'LIMIT',
    side: 'SELL',
    price: '$2500.00',
    amount: '0.1',
    filled: '0.1',
    time: '2024-04-01 12:30:00',
  },
  {
    pair: 'LTC/USDT',
    type: 'LIMIT',
    side: 'BUY',
    price: '$200.00',
    amount: '1',
    filled: '1',
    time: '2024-04-01 13:00:00',
  },
  {
    pair: 'XRP/USDT',
    type: 'LIMIT',
    side: 'SELL',
    price: '$1.00',
    amount: '100',
    filled: '100',
    time: '2024-04-01 13:30:00',
  },
]

export default function OrderBlockTable() {
  return (
    <Table className="text-gray-400">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[400px]">Pair</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Side</TableHead>
          <TableHead className="">Price</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Filled</TableHead>
          <TableHead className="text-right">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, i) => (
          <TableRow key={i} className="cursor-pointer ">
            <TableCell className="font-medium">{order.pair}</TableCell>
            <TableCell>{order.type}</TableCell>
            <TableCell>{order.side}</TableCell>
            <TableCell>{order.price}</TableCell>
            <TableCell>{order.amount}</TableCell>
            <TableCell>{order.filled}</TableCell>
            <TableCell className="text-right">{order.time}</TableCell>
            <TableCell className="">
              {/* add a cross icon here which will appear on hover */}
              <div className="w-8 group bg-red-100">
                <span className="hidden group-hover:block ml-10">X</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
