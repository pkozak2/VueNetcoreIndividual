<template>
  <div>
    <h1 id="tableLabel">Weather forecast</h1>

    <p>This component demonstrates fetching data from the server.</p>

    <p v-if="!forecasts[0]">
      <em>Loading...</em>
    </p>

    <table class="table table-striped" aria-labelledby="tableLabel" v-if="forecasts[0]">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let forecast of forecasts">
          <td>{{ forecast.date }}</td>
          <td>{{ forecast.temperatureC }}</td>
          <td>{{ forecast.temperatureF }}</td>
          <td>{{ forecast.summary }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "FetchData",
  data() {
    return {
      forecasts: []
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const baseURI = "/weatherforecast";
      this.$http
        .get(baseURI)
        .then(result => {
          this.forecasts = result.data;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>