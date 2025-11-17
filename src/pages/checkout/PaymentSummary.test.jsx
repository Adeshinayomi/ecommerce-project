import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen} from "@testing-library/react";
import { MemoryRouter,useLocation } from "react-router";
import { formatCurrency } from "../../utils/money";
import userEvent from "@testing-library/user-event";
import { PaymentSummary } from "./PaymentSummary";

vi.mock('axios')

function Location(){
  const location=useLocation()
  return(
    <div data-testid='url-path'>
      {location.pathname}
    </div>
  )
}

describe('payment component',()=>{
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(()=>{
    paymentSummary={
      totalItems:3,
      productCostCents:6285,
      shippingCostCents:499,
      totalCostBeforeTaxCents:6784,
      taxCents:678,
      totalCostCents:7462
    }
    loadCart=vi.fn()
    user=userEvent.setup()
  })

  it('displays payments',async()=>{
    render(
     <MemoryRouter>
      <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
     </MemoryRouter>
    )
    const paymentSummaryRow=await screen.findAllByTestId('payment-summary-row')

    expect(
      paymentSummaryRow[0]
    ).toHaveTextContent(formatCurrency(6285))
    
    expect(
      paymentSummaryRow[1]
    ).toHaveTextContent(formatCurrency(499))
    
    expect(
      paymentSummaryRow[2]
    ).toHaveTextContent(formatCurrency(6784))
    
    expect(
      paymentSummaryRow[3]
    ).toHaveTextContent(formatCurrency(678))
    
    expect(
      paymentSummaryRow[4]
    ).toHaveTextContent(formatCurrency(7462))
  })

  it('works with place order button',async()=>{
    render(
     <MemoryRouter>
      <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
      <Location />
     </MemoryRouter>
    )

    const location=screen.getByTestId('url-path')
    const placeOrderButton=screen.getByTestId('place-order')
    
    await user.click(placeOrderButton)


    expect(location).toHaveTextContent('/orders')
  })
})