/**
 * We would love to invite you to a phone screen,
 * however we believe that phone screens are not the best way for us both
 * to understand your skills and accomplishments.
 * We have created a small exercise where you can really show off your knowledge and skills.
 * Spend no more than 30 mins-1 hour (the length of a phone screen) on the exercise.
 * Make sure to share the code and paste your link into wellfound.
 *
 *
 * At rings, we are always fetching and manipulating data
 * Your objective is to create an autocomplete search component using a graphql API
 *
 * Here are the basic requirements:
 * - The user should be able to search for least ONE types of entity
 * - After the user types something in, they should see a list suggestions
 * - When a user clicks on a suggestion, it should complete the search field with the name
 *
 *
 * We want to see from you:
 * - Translating the requirements into a solution
 * - An understanding of NextJS and GraphQL
 * - Responsive and clean interface
 *
 *
 * You are free to use any libraries you want
 * And approach the solution to this problem that you prefer
 * There is no perfect solution but you should meet the requirements
 *
 * GraphQL API
 * https://rickandmortyapi.com/documentation * https://rickandmortyapi.com/graphql
 *
 */

import { AutoComplete } from "./components/AutoComplete/AutoComplete";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AutoComplete />
    </main>
  );
}
