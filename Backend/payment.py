from nkwa_pay_sdk import Pay

# Initialize client with your API key
sdk = Pay(
    api_key_auth="your_api_key",
)

# For sandbox environment
sdk = Pay(
    api_key_auth="KavEM5mVdNt67Ryxt8cGr",
    server_url="https://api.sandbox.pay.mynkwa.com",
)


def collect_payment(amount: int, phone:str, desc: str):
    try:
        response = sdk.collect.post(
            request_body={
                "amount": amount,  # Amount in XAF
                "phoneNumber": phone,
                "description": str
            }
        )
        
        return {response.payment.id}  # Use this ID to check payment status later

    except Exception as e:
        print(f"Error: {str(e)}")

async def disburse_payment():
    try:
        response = sdk.disburse.post(
            request_body={
                "amount": 1000,  # Amount in XAF
                "phoneNumber": "237600000000",
                "description": "Refund for order #1234"
            }
        )
        
        print(f"Disbursement ID: {response.payment.id}")  # Use this ID to check status later
    except Exception as e:
        print(f"Error: {str(e)}")