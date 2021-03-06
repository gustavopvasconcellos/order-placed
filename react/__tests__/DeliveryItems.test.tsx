import React from 'react'

import { orderGroupQuery as giftRegistry } from '../mocks/giftRegistry'
import { orderGroupQuery as oneDelivery } from '../mocks/oneDeliverySimple'
import { orderGroupQuery as twoDeliveries } from '../mocks/twoDeliveries'
import DeliveryPackages from '../DeliveryPackages'
import { renderWithOrder } from '../utils/testUtils'

test('renders ShippingHeader with shipping estimate', () => {
  const { getByText } = renderWithOrder(
    oneDelivery.orderGroup,
    <DeliveryPackages />
  )

  expect(getByText('Delivery')).toBeDefined()
  expect(getByText('TranslateEstimate')).toBeDefined()
})

test('renders delivery counter when multiple deliveries', () => {
  const { queryAllByText } = renderWithOrder(
    twoDeliveries.orderGroup,
    <DeliveryPackages />
  )

  expect(queryAllByText(/- n˚ \d of \d/)).toHaveLength(2)
})

test("doesn't render delivery counter when there is only one delivery", () => {
  const { queryByText } = renderWithOrder(
    oneDelivery.orderGroup,
    <DeliveryPackages />
  )

  expect(queryByText(/- n˚ \d of \d/)).toBeNull()
})

test('renders product list', () => {
  const { getByText } = renderWithOrder(
    twoDeliveries.orderGroup,
    <DeliveryPackages />
  )

  expect(
    getByText('Delivery entrega agendada e Delivery com várias SLAs Tipo 1')
  ).toBeDefined()
  expect(getByText('Camisa Seleção Brasileira')).toBeDefined()
  expect(getByText('Camisa America Vermelha')).toBeDefined()
})

test('renders correct messsage when order is from a Gift Registry and not render address component', () => {
  const { queryByText, queryByTestId } = renderWithOrder(
    giftRegistry.orderGroup,
    <DeliveryPackages />
  )

  expect(queryByText('Address from: Lista Lucas QA')).toBeDefined()
  expect(queryByTestId('address-component')).toBeNull()
})
