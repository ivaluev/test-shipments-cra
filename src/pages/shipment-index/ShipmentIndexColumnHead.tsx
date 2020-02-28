import React, { useState } from 'react'

type Props = {
  title: string
}

export default function ShipmentIndexColumnHead({ title }: Props) {
  return <span>{title}</span>
}
