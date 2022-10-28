# Github action lamba invoker

Call a lamba function synchrously

## Inputs

| Name              | Required | Description                                                                            |
| ----------------- | -------- | -------------------------------------------------------------------------------------- |
| `function-name`   | * | The function to invoke
| `payload-file`      |         | The file containing the payload of the request.<br/>**Example**: src/config/tst.json<br/><br/>One of payload-file or payload is mandatory |
| `payload`    |         | the JSON payload.<br/>**Example**: {"test": "Doe"}<br/><br/>One of payload-file or payload is mandatory 
| `aws-region`    |         | Defaults to: eu-west-1                                     |

## Outputs

## Example usage

```yaml
uses: brunofrankinrb/nrb-dt-aws-lambda-invoke-action@v1
with:
  function-name: spring-batch-management
  payload-file: src/config/batch-dev.json
  aws-region: eu-west-1
```
