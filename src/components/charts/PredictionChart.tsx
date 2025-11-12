import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PredictionChartProps {
  data: {
    dates: string[];
    actual_prices: number[];
    predicted_prices?: number[];
  };
  ticker: string;
}

export default function PredictionChart({ data, ticker }: PredictionChartProps) {
  const chartData = data.dates.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    actual: data.actual_prices[index],
    predicted: data.predicted_prices && data.predicted_prices[index] ? data.predicted_prices[index] : null,
  }));

  return (
    <div className="bg-gradient-to-br from-white to-teal-50/50 backdrop-blur-sm rounded-2xl border border-teal-300 p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Price History & Predictions</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${value.toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #5eead4',
              borderRadius: '8px',
              padding: '12px'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            labelStyle={{ color: '#111827', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#14b8a6"
            strokeWidth={3}
            dot={{ fill: '#14b8a6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Actual Price"
          />
          {data.predicted_prices && data.predicted_prices.length > 0 && (
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
              name="Predicted Price"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
