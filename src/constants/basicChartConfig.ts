import {
  ColorType,
  ChartOptionsBase,
  CandlestickStyleOptions,
  LineStyle,
} from 'lightweight-charts'

type PartialChartOptions = Partial<ChartOptionsBase>
type PartialCandlestickStyleOptions = Partial<CandlestickStyleOptions>

export const candleStickChartOptions: PartialCandlestickStyleOptions = {
  upColor: '#3674D9',
  downColor: '#E13256',
  borderVisible: false,
  wickUpColor: '#3674D9',
  wickDownColor: '#E13256',
}

export const chartBaseOptions: PartialChartOptions = {
  autoSize: true,
  layout: {
    background: {
      // we will keep it dark mode
      type: ColorType.Solid,
      color: '#111827',
    },
    fontFamily: 'Arial',
    fontSize: 12,
    textColor: '#d1d4dc',
  },
  crosshair: {
    mode: 0,
    vertLine: {
      width: 4,
      color: '#C3BCDB44',
      style: LineStyle.Solid,
      labelBackgroundColor: '#9B7DFF',
      visible: true,
      labelVisible: true,
    },
    horzLine: {
      width: 1,
      style: LineStyle.Dotted,
      visible: true,
      labelVisible: true,
      color: '#9B7DFF',
      labelBackgroundColor: '#9B7DFF',
    },
  },
  grid: {
    vertLines: {
      color: '#4e5054',
      style: 0,
      visible: true,
    },
    horzLines: {
      color: '#4e5054',
      style: 0,
      visible: true,
    },
  },
}
