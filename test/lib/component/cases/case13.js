export const title       = '13) Complex example'
export const description = `Olimpic medals`;

export function script () {
  defineComponent(
    'my-component',
    `
    <g-composer>
      <template>
        <svg :viewBox="[0, 0, 200, data.height]" :height="data.height * 2.5" style="background-color: white" font-family="sans-serif">
          <g g-for="(record, i) of data">
            <text font-size="6"
                  :x="i % 2 ? 87 : 113" 
                  :y="record.y + 3"
                  :text-anchor="i % 2 ? 'end' : 'start'"
                  g-content="record.label" ></text>
            <g g-for="x of record.n">
              <line x1="100" stroke="black" stroke-width="0.1"
                    :y1="record.y"
                    :x2="$.polar2cartesian(100, record.y, record.r, x / record.n * 180 * (i % 2 ? 1 : -1)).x" 
                    :y2="$.polar2cartesian(100, record.y, record.r, x / record.n * 180).y"/>
              <circle r="2" stroke-width="0.3"
                      :cx="$.polar2cartesian(100, record.y, record.r, x / record.n * 180 * (i % 2 ? 1 : -1)).x" 
                      :cy="$.polar2cartesian(100, record.y, record.r, x / record.n * 180).y" 
                      :fill="x < record.g ? '#ffd700' : x < record.g + record.s ? '#ddd' : '#b8860b'"/>
              <text g-if="x + 1 === record.g || x + 1 === record.g + record.s || x + 1 === record.g + record.s + record.b"
                    :x="$.polar2cartesian(100, record.y + 1, record.r + 5, x / record.n * 180 * (i % 2 ? 1 : -1)).x" 
                    :y="$.polar2cartesian(100, record.y + 1, record.r + 5, x / record.n * 180).y"
                    :text-anchor="i % 2 ? 'start' : 'end'"
                    font-size="4"
                    g-content="x < record.g ? record.gold : x < record.g + record.s ? record.silver : record.bronze"> 
                x
              </text>
            </g>
            <clipPath :id="'clip-circle-' + i"><circle cx="100" :cy="record.y" r="10"/></clipPath>
            <image x="86.5" width="27"
                   :y="record.y - 10" 
                   :clip-path="\`url(#clip-circle-$\{ i })\`"
                   :href="record.image"/>
          </g>
        </svg>
      </template>
      <script type="data">
        country,code,gold,silver,bronze,total
        "United States of America","us",40,44,42,126
        "People's Republic of China","cn",40,27,24,91
        "Great Britain","gb",14,22,29,65
        "France","fr",16,26,22,64
        "Australia","au",18,19,16,53
      </script>
      <script type="methods">
        function data (originData) {
          const result = [];
          let y = 10;
          let r = 0;
          for (const country of originData) {
            y += r + (country.total / 2);
            r = country.total / 2;
            result.push({
              label: \`$\{ country.country } ($\{ country.total })\`,
              image: \`https://flagicons.lipis.dev/flags/4x3/$\{ country.code }.svg\`,
              y,
              r,
              n: 0 | country.total / 3,
              g: 0 | country.gold / 3,
              s: 0 | country.silver / 3,
              b: 0 | country.bronze / 3,
              gold: country.gold,
              silver: country.silver,
              bronze: country.bronze
            })
          }
          result.height = y + r + 10;
          return result;
        }
      </script>
    </g-composer>
`);
}

export default `
  <my-component>
  <script type="data">
          country,code,gold,silver,bronze,total
        "United States of America","us",40,40,40,120
        "People's Republic of China","cn",40,20,20,80
        "Great Britain","gb",10,20,20,50
        "Australia","au",10,10,10,30
        "France","fr",10,20,20,50
  </script>
</my-component>
`;
