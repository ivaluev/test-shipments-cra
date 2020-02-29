import React from 'react'
import styled from '../../utils/styled'
import trunc from '../../utils/ext'

export enum StepStatusEnum {
  PENDING = 0,
  EXECUTING = 1,
  DONE = 2
}

/**
 * we draw steps by segment of a circle and a line
 * if line is omitted - no line is drawn
 */
export class Step {
  /**
   *
   */
  constructor(
    pointName: string,
    pointStatus: StepStatusEnum,
    lineStatus?: StepStatusEnum,
    lineCar?: string,
    lineDriver?: string
  ) {
    this.pointName = pointName || 'PointName'
    this.pointStatus = pointStatus
    this.lineStatus = lineStatus
    this.lineCar = lineCar
    this.lineDriver = lineDriver
  }

  pointName: string

  pointStatus: StepStatusEnum

  lineStatus?: StepStatusEnum

  lineCar?: string

  lineDriver?: string
}

type Props = {
  data: Step[]
  step?: number
  centerLine?: number
}

const colorGreen = '#CCCA6A' // '#5fc358'
const colorGrey = '#909090' // '#595959'
const circleRadius = 23
const circleStrokeWidth = 7

export default function ShipmentInfoPath({ data = [], step = 470, centerLine = 60 }: Props) {
  const getLen = (text: string) => {
    return (text && Math.min(30, text.length) * 6) || 10
  }

  if (data.length) {
    let counter = 0
    const firstOffset = 60
    const labelOffset = 15
    const carYOffset = 60

    const svg = (
      <svg
        width={(data.length - 1) * step + 150}
        height="100"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <g id="cigreen">
            <circle stroke="white" strokeWidth={circleStrokeWidth} fill={colorGreen} r={circleRadius} />
          </g>
          <g id="cigrey">
            <circle stroke="white" strokeWidth={circleStrokeWidth} fill={colorGrey} r={circleRadius} />
          </g>
        </defs>

        {data.map(i => (
          <g key={i.pointName}>
            {i.lineStatus != null && (
              <>
                <SvgLine2
                  y1={centerLine}
                  x1={step * counter + firstOffset}
                  y2={centerLine}
                  x2={step * (counter + 1) + firstOffset}
                  stroke={i.lineStatus > StepStatusEnum.PENDING ? colorGreen : colorGrey}
                />
                <foreignObject y={carYOffset} x={step * counter + firstOffset} width="210" height="40">
                  <CarOuter>
                    <CarInner>
                      <CarText>{i.lineCar}</CarText>
                      <CarText>{i.lineDriver}</CarText>
                    </CarInner>
                  </CarOuter>
                </foreignObject>
              </>
            )}

            <SvgText
              // className="point-font"
              y={labelOffset}
              x={step * counter + firstOffset}
              dx={-(getLen(i.pointName) / 2)}
              textAnchor="start"
              textLength={getLen(i.pointName)}
            >
              {trunc(i.pointName, 30, true)}
            </SvgText>
            <use
              y={centerLine}
              x={step * counter++ + firstOffset}
              xlinkHref={i.pointStatus > StepStatusEnum.PENDING ? '#cigreen' : '#cigrey'}
            />
          </g>
        ))}
      </svg>
    )

    return <Wrapper>{svg}</Wrapper>
  }
  return <Wrapper>no data</Wrapper>
}

const SvgText = styled('text')`
  font-family: Roboto, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-size: 12px;
  padding-bottom: 1em;
  fill: darkgray;
`

const SvgLine2 = styled('line')`
  stroke-width: 4;
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear forwards;
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`

const Wrapper = styled('div')`
  text-align: center;
  width: 100%;
`
const CarOuter = styled('div')`
  display: table;
  height: 40px;
  overflow: hidden;
  text-align: center;
  width: 210px;
`
const CarInner = styled('div')`
  display: table-cell;
  vertical-align: left;
  line-height: 13px;
`
const CarText = styled('div')`
  color: black;
  font-size: 11px;
  text-align: center;
`
