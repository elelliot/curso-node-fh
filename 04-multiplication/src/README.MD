# Multiplication table file creation with yargs and some clean architecture with useCases pattern

# Run app
`npx ts-node src/app.ts --base 1 -l 2 -s true -n "table-2" -d chill-outputs`
> Note: strings can have spaces if we wrap the text with ""

# Output
## It should generate:
 A file with the following path:
> chill-outputs/table-2.txt

and the following text multiplication table in its content:

> 1 x 1 = 1

> 1 x 2 = 2

Also, because of `-s true` it should display the table in console.

# Future update with args explanation coming soon