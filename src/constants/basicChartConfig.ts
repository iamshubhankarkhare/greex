import {
  ColorType,
  ChartOptionsBase,
  CandlestickStyleOptions,
} from 'lightweight-charts'

type PartialChartOptions = Partial<ChartOptionsBase>
type PartialCandlestickStyleOptions = Partial<CandlestickStyleOptions>

export const candleStickChartOptions: PartialCandlestickStyleOptions = {
  upColor: '#169768',
  downColor: '#AC3042',
  borderVisible: false,
  wickUpColor: '#169768',
  wickDownColor: '#AC3042',
}

export const chartBaseOptions: PartialChartOptions = {
  autoSize: true,
  layout: {
    background: {
      // we will keep it dark mode
      type: ColorType.Solid,
      color: '#1D1F22',
    },
    fontFamily: 'Arial',
    fontSize: 12,
    textColor: '#d1d4dc',
  },
  crosshair: {
    mode: 1, // magnet mode
    vertLine: {
      color: '#4e5054',
      width: 1,
      style: 0,
      visible: true,
      labelVisible: true,
      labelBackgroundColor: '#4c525e',
    },
    horzLine: {
      color: '#4e5054',
      width: 1,
      style: 0,
      visible: true,
      labelVisible: true,
      labelBackgroundColor: '#4c525e',
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
