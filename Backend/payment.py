from nkwa_pay_sdk import Pay

# Initialize client with your API key
# sdk = Pay(
#     api_key_auth="your_api_key",
# )

# For sandbox environment
sdk = Pay(
    api_key_auth="KavEM5mVdNt67Ryxt8cGr",
)


async def collect_payment(amount: int, phone:str, desc: str):
    try:
        response = await sdk.payments.collect_async(
                amount = amount,  # Amount in XAF
                phone_number = "237600000000",
                # description = desc
        )
        
        return {"status":"success", "p_id" : response.payment.id}  # Use this ID to check payment status later

    except Exception as e:
        return {"status": "Failed", "details": str(e)}

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