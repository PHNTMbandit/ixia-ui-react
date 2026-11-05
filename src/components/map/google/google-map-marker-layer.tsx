import { Fragment } from 'react'
import type { Key, ReactNode } from 'react'

interface GoogleMapMarkerLayerProps<Item> {
  items: readonly Item[]
  getKey: (item: Item) => Key
  renderItem: (item: Item) => ReactNode
  children?: ReactNode
}

export function GoogleMapMarkerLayer<Item>({
  items,
  getKey,
  renderItem,
  children,
}: GoogleMapMarkerLayerProps<Item>) {
  return (
    <>
      {items.map((item) => (
        <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
      ))}
      {children}
    </>
  )
}

export type { GoogleMapMarkerLayerProps }
