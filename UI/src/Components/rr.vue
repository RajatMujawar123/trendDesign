<template>
  <div class="animated revealUp">
    <div class="white-wrapper">
      <div class="section-title mb-4">{{ $t("Reservations") }}</div>
      <div class="mt-3 mb-2">
        <div class="row">
          <!-- SELECT DROPDOWN -->
          <div class="col-lg-4 col-xl-3 align-self-center mb-4">
            <div class="dropdown-curve-container mr-2">
              <label
                :class="
                  selectedCinema && selectedCinema.length > 0 ? 'shift-up' : ''
                "
                >{{ $t("select") }} {{ $tc("cinema", 1) }}</label
              >
              <b-dropdown
                id="selectcinema"
                :disabled="isRoleID"
                :text="selectedCinema"
                class="w-100"
                name="selectcinema"
                variant="dropdown-curve"
              >
                <div class="px-2 pb-2">
                  <input
                    v-model="searchCinema"
                    :placeholder="$t('searchCinema')"
                    autofocus
                    class="form-control form-control-sm"
                    required
                    type="search"
                    v-on:keydown="onSearchCinema($event.target.value)"
                    v-on:keyup="onSearchCinema($event.target.value)"
                    v-on:search="onSearchCinema($event.target.value)"
                  />
                </div>
                <b-dropdown-item
                  v-for="(Cinema, CinemaIndex) in Cinemas"
                  :key="CinemaIndex"
                  href="#"
                  v-on:click="onSelectCinema($event, Cinema)"
                  >{{ Cinema.cine_name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>

          <!-- Transaction Date From-->
          <div class="col-lg-4 col-xl-3 align-self-center mb-4">
            <div class="input-material">
              <div class="add-datepicker">
                <button
                  v-if="fetchReservationDetail.from_date"
                  class="btn-clearDate"
                  v-on:click="clearDate(2)"
                >
                  ✖
                </button>
                <Datepicker
                  id="selectenddate_1"
                  ref="programaticOpen"
                  v-model="fetchReservationDetail.from_date"
                  v-validate="'required'"
                  :monday-first="true"
                  :typeable="true"
                  name="selectenddate_1"
                  @selected="onchangeDate($event, 'from')"
                ></Datepicker>
                <label :class="fetchReservationDetail.from_date ? 'active' : ''"
                  >{{ $t("Reservation") }} {{ $t("fromdate") }}</label
                >
              </div>
            </div>
          </div>

          <!-- Transaction Date To -->
          <div class="col-lg-4 col-xl-3 align-self-center mb-4">
            <div class="input-material">
              <div class="add-datepicker">
                <button
                  v-if="fetchReservationDetail.to_date"
                  class="btn-clearDate"
                  v-on:click="clearDate('to_date')"
                >
                  ✖
                </button>
                <Datepicker
                  id="selectenddate_3"
                  ref="programaticOpen"
                  v-model="fetchReservationDetail.to_date"
                  v-validate="'required'"
                  :monday-first="true"
                  :typeable="true"
                  name="selectenddate_3"
                ></Datepicker>
                <label :class="fetchReservationDetail.to_date ? 'active' : ''"
                  >{{ $t("Reservation") }} {{ $t("todate") }}</label
                >
              </div>
            </div>
          </div>

              <!-- <div class="col-12 col-md-6 col-lg-3 col-xl-3  mb-3">
                       <div class="dropdown-curve-container">
                        <label
                :class="
                  selectedPaymentSource
                    ? 'shift-up'
                    : 'font-weight-bold'
                "
                > </label
              >
                         <multiselect
                           :options="statusList"
                           v-model="selectedPaymentSource"
                           placeholder="Payment Status"
                           label="payment_type"
                           :multiple="false"
                           :close-on-select="true"
                           track-by="payment_type"
                           :showLabels="false"
                         ></multiselect>
                       </div>
                     </div> -->

              <div class="mx-3">
  <b-dropdown
    :text="filter_is_active_label"
    variant="dropdown-curve"
    class="ml-auto mr-3 filter-status-dropdown"
    style="min-width: 300px"
  >
    <b-dropdown-item @click="onChangeFilterIsActive('All')">
      All
    </b-dropdown-item>
    <b-dropdown-item
      @click="onChangeFilterIsActive('Payment Success | Booking Success')"
    >
      Payment Success | Booking Success
    </b-dropdown-item>
    <b-dropdown-item
      @click="onChangeFilterIsActive('Payment Success | Booking Failed')"
    >
      Payment Success | Booking Failed
    </b-dropdown-item>
    <b-dropdown-item @click="onChangeFilterIsActive('Failure')">
      Failure
    </b-dropdown-item>
  </b-dropdown>
</div>

          <div class="col-lg-6 col-xl-3 align-self-center mb-3">
            <button
              :disabled="btenable"
              class="btn-blue-lg w-100"
              @click.prevent.stop="onGetTransactionList"
            >
              {{ $tc("fetch") }} {{ $tc("report") }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="d-flex justify-content-end align-items-center mb-4">
          <div class="w-50">
            <b-form-input
              v-model="searchReservations"
              v-debounce:800="onSearchReservation"
              placeholder="Search "
            ></b-form-input>
          </div>
          <div class="d-flex"></div>
          <div class="d-flex align-items-center justify-content-end w-100">
            <div class="mx-2">
              <b-dropdown
                id="listview"
                class=""
                name="listview"
                variant="outline-blue"
              >
                <template v-slot:button-content>
                  <!-- {{ $tc("viewing") }}&nbsp;
                  <strong>{{ selectedvalue }}</strong>
                  &nbsp;Of&nbsp; -->
                  <strong>{{ viewingRange }}</strong>
                </template>
                <b-dropdown-item
                  v-for="(list, listIndex) in viewingnumbers"
                  :key="listIndex"
                  @click="onDropDownChangeValue(list.name)"
                  >{{ list.name }}
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div class="swc-report">
          <table border="1" class="swc-report-table mb-3">
            <thead>
              <tr>
                <th class="sticky">{{ $tc("Reservation ID") }}</th>
                <th class="sticky">{{ $tc("email") }}</th>
                <th>{{ $tc("customer") }} {{ $tc("Number") }}</th>
                <th>{{ "Cinema" }}</th>
                <th>{{ $tc("Booking") }} {{ $tc("Source") }}</th>
                <th>
                  {{ $tc("reservation") }} {{ $tc("date") }} & {{ $tc("time") }}
                </th>
                <th>
                  {{ $tc("show") }} {{ $tc("booking") }} {{ $tc("date") }} &
                  {{ $tc("time") }}
                </th>
                <th>{{ $tc("Booking Code") }}</th>
                <th>{{ $tc("Seat Name") }}</th>
                <th>{{ $tc("Payment Type") }}</th>
                <th>{{ $tc("Payment Status") }}</th>
                <th>{{ $tc("Booking Status") }}</th>
                <th>{{ $tc("PG Response") }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-for="(user, userIndex) in reservationList"
              :key="userIndex"
              class="sph-report"
            >
              <tr>
                <td
                  :style="
                    user.booking_status == false && user.payment_status == true
                      ? 'color:red'
                      : user.booking_status == true &&
                        user.payment_status == true
                      ? 'color:green'
                      : ''
                  "
                  class="sticky"
                >
                  {{ user.reservation_id | filterNullUndefined }}
                </td>
                <td class="sticky">
                  {{ user.customer_email_final || email_check || "-" }}
                </td>
                <td>{{ user.customer_mobile_final || mobile_check || "-" }}</td>
                <td>{{ user.cinema_name || "-" }}</td>
                <td>{{ user.bs_source || "-" }}</td>
                <td>{{ user.created_at | fulldatemonparse }}</td>
                <td>{{ user.actual_show_time | fulldatemonparse }}</td>
                <td>{{ user.sb_booking_code | filterNullUndefined }}</td>
                <td>{{ user.seat_name | filterNullUndefined }}</td>
                <td>
                  {{ user.payment_type_actual_name | filterNullUndefined }}
                  {{
                    user.payment_type_name ? `(${user.payment_type_name})` : ""
                  }}
                </td>
                <td>{{ user.payment_type || "-"  }}</td>
                <td>{{ user.sb_booking_code ? "Success" : "Failed" }}</td>
                <td>{{ user.response_message || user.fail_message }}</td>
                <td class="text-left">
                  <b-button
                    class="btn-blue v-step-1"
                    variant="default"
                    v-on:click="getSystemLogs(user)"
                  >
                    {{ "Get Logs" }}
                  </b-button>
                </td>
              </tr>
            </tbody>
            <tbody v-if="reservationList.length == 0">
              <tr>
                <td colspan="13">
                  <!-- <p v-if="reservationList.length == 0" class="text-center">
                {{ $tc("NoRecords") }}
              </p> -->
                  <NoRecords />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <b-pagination
        v-if="reservationList.length > 0"
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="my-table"
        class="my-3"
        @change="onChangePagination($event)"
      ></b-pagination>
    </div>

    <b-modal
      id="paymentDetailsModal"
      ref="paymentDetailsModal"
      :title-html="`<div class='d-flex align-items-center'><span class='lock'></span>&nbsp;<span>Payment Details</span></div>`"
      centered
      header-class="managerAuthPop__header_class"
      hide-footer
      modal-class="managerAuthPop__modal_class"
      no-close-on-backdrop
      no-close-on-esc
      no-enforce-focus
      no-fade
      no-stacking
      title-class="managerAuthPop__title_class"
    >
      <div class="row mx-0">
        <div class="col mx-auto align-self-center">
          <div class>
            <div class="" style="background-color: #eeeeee">
              <pre style="color: #444; /*line-height: 1.7;*/">
            {{ " " }}
            {{ paymentDetailsObj }}
            {{ " " }}
          </pre
              >
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import MasterService from "@/services/MasterService";
import moment from "moment-timezone";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";
import _ from "lodash";
import PosService from "@/services/PosService";
import Printd from "printd";
import NoRecords from "@/components/Partials/NoRecords.vue";
import { createQueryString } from "@/services/ApiHelper";

export default {
  components: { DatePicker, Multiselect, NoRecords },
  data() {
    return {
            filter_is_active_label: "All",
       statusList:[],
      selectedPaymentSource:[],
      paymentDetailsObj: {},
      CinemasCopy: [],
      searchCinema: "",
      btenable: false,
      selectedFilterValue: "",
      filterValues: [],
      filterValuesCopy: [],
      searchFilterValues: "",
      isRoleID: true,
      reservationList: [],
      reservationListCopy: [],
      searchUserValue: "",
      searchUsers: [],
      isSearchLoading: false,
      schedules: [],
      selected_ssid: "",
      selected_show_time: null,

      selectedFilter: "",
      users: ["Screen", "Movie", "User", "Show Booking Code"],
      fetchReservationDetail: {
        date: "",
        cinema_id: null,
        ssb_code: "",
        show_date: "",
        show_date_to: null,
        from_date: moment().toDate(),
        to_date: new Date(),
      },
      filterkey: "",
      filtervalue: "",
      selectedCinema: "",
      Cinemas: [],
      EjsData: null,
      perPage: 10,
      currentPage: 1,
      rows: 0,
      selectedvalue: "50",
      viewingnumbers: [],
      sendMailObj: [],
      currencyData: "",

      searchReservations: "",
    };
  },
  beforeMount() {
    let obj = this.secureStore.get("USINFO").cinema_id;
    let roleid = this.secureStore.get("USINFO").role_id;
    this.getCurrencyCode();
    if (true) {
      this.isRoleID = false;
      this.getCinemaList(obj);
    } else {
      this.getCinemaList(obj);
    }

    let CinemaObj = this.$store.getters.getSelectedDropDownCinema;
    if (CinemaObj) {
      this.onSelectCinema(null, CinemaObj);
    }

    console.log("transactions page route", this.$route);
    let queryparams = this.$route.query;

    if (queryparams.cinema_id && parseInt(queryparams.cinema_id)) {
      this.fetchReservationDetail.cinema_id = parseInt(queryparams.cinema_id);
    }

    // this.onGetTransactionList();
    this.getviewingnumber();
  },
  watch: {
    "$store.getters.getSelectedDropDownCinema": function (CinemaObj) {
      if (CinemaObj) {
        this.onSelectCinema(null, CinemaObj);
      }
    },
  },
  computed: {

    checkValidation() {
      return !!(
        this.fetchReservationDetail.from_date &&
        this.fetchReservationDetail.to_date
      );
    },
    viewingRange() {
      if (this.rows === 0) {
        return "Viewing 0 to 0 of 0";
      }

      const start = (this.currentPage - 1) * this.perPage + 1;
      const end = Math.min(this.currentPage * this.perPage, this.rows);

      return `Viewing ${start} to ${end} of ${this.rows}`;
    },
  },
  methods: {
       onChangeFilterIsActive(option) {
          this.reservationList = [];
          this.reservationListCopy = [];
    
          this.filter_is_active_label = option;
          this.searchReservations = "";
          this.onSearchReservation();
        },
    onSearchReservation() {
      this.currentPage = 1;
      this.onGetTransactionList();
    },
    getCurrencyCode: function () {
      let payload = {
        tableName: "ms_currencies",
        curr_is_active: "Y",
        curr_id:
          this.secureStore.get("BRGLOPCU") &&
          this.secureStore.get("BRGLOPCU").go_value,
      };
      MasterService.GetActiveList(payload)
        .then((response) => {
          const { data } = response;
          if (data && data.status && data.Records.length > 0) {
            this.currencyData = data.Records[0];
            console.log(this.currencyData, " this.currencyData");
          } else {
            // Show Error Message:
            console.log("data.message :", data.message);
          }
        })
        .catch((error) => {
          // Catch Error:
          console.log("Catch Error on getActiveScreenByCinemaId :", error);
        });
    },
    sendMailToUpdate() {},
    sendMailToUser(obj) {},
    excelDownload(BASE_URL, type) {
      let payload = {
        cinema_id: this.fetchReservationDetail.cinema_id,
        from_date: this.fetchReservationDetail.from_date
          ? moment(this.fetchReservationDetail.from_date).format("YYYY-MM-DD")
          : null,
        filterkey: this.filterkey ? this.filterkey : null,
        filtervalue: this.filtervalue ? this.filtervalue : null,
        ss_id: this.selected_ssid || null,
        limit: 10000,
        currentPage: 1,
        type: type,
      };
      payload["to_date"] = this.fetchReservationDetail.to_date
        ? moment(this.fetchReservationDetail.to_date).format("YYYY-MM-DD")
        : null;

      console.log(payload);
      let qs = createQueryString(payload);
      console.log(qs);
      window.open(`${BASE_URL}/api/admin/reports/v2/transactions${qs}`);
    },
    moment,
    getviewingnumber() {
      this.viewingnumbers = [
        { name: "All", id: 1 },
        { name: "50", id: 4 },
        { name: "100", id: 5 },
        { name: "500", id: 6 },
        { name: "1000", id: 7 },
        { name: "2000", id: 8 },
      ];
    },
    onDropDownChangeValue(event) {
      if (event == "All") {
        this.perPage = this.rows;
        this.selectedvalue = event;
        this.onChangePagination();
      } else {
        console.log("Numbers :", event);
        this.selectedvalue = event;
        this.perPage = event;
        console.log("perPage :", this.perPage);
        this.onChangePagination();
      }
    },
    onChangePagination: function (event) {
      // console.log(event);
      if (event === undefined) {
        this.currentPage = 1;
        this.onGetTransactionList();
      } else {
        this.currentPage = event;
        this.onGetTransactionList();
      }
    },
    onPrintHandler: function (sb_id, cinema_id) {
      let loader = this.$loading.show();
      let isReprint = true;
      PosService.GetTicketEjs(sb_id, cinema_id, isReprint)
        .then(async (response) => {
          const { data } = response;

          this.EjsData = data;

          this.$nextTick(() => {
            loader.hide();
            const p = new Printd();
            if (this.$refs.onPrint && this.EjsData != null) {
              p.print(this.$refs.onPrint, []);
            }
          });
        })
        .catch(this._CatchError);
    },
    clearDate(type = 1) {
      this.currentPage = 1;
      this.reservationList = [];

      switch (type) {
        case 2:
        case "to_date":
          this.fetchReservationDetail.from_date = "";
          this.fetchReservationDetail.to_date = "";
          break;
      }
    },
    debouncedOnChange: _.debounce(function (query) {
      this.searchReservations = "";
      this.reservationList = [];
      this.currentPage = 1;
      // this.onGetTransactionList();
    }, 500),

    onchangeDate: function (event, type) {
      if (type == "from") {
        this.fetchReservationDetail.to_date = new Date(event);
        this.$forceUpdate();
      }
      this.debouncedOnChange();
    },
    onSearchCinema: function (value) {
      if (this.searchCinema && this.searchCinema.length > 0) {
        this.Cinemas = this.CinemasCopy.filter((x) => {
          if (
            x.cine_name.toLowerCase().includes(this.searchCinema.toLowerCase())
          ) {
            return x;
          }
        });
      } else {
        this.Cinemas = this.CinemasCopy;
      }
    },

    getCinemaList: function (cine_id) {
      this.Cinemas = [];
      // let payload = {
      //   tableName: "ms_cinemas",
      //   cine_is_active: "Y"
      // };
      MasterService.GetCinemasByRoles({ cine_id: cine_id })
        .then((response) => {
          const { data } = response;
          if (data.status && data.Records && data.Records.length > 0) {
            this.Cinemas = [...data.Records];
            this.CinemasCopy = [...data.Records];
            let role_is_cinema_level = this.secureStore.get("USINFO").cinema_id;
            if (!role_is_cinema_level) {
              this.Cinemas = [
                {
                  cinema_id: "All",
                  cine_id: "All",
                  cine_name: "All",
                  cinema_name: "All",
                },
                ...data.Records,
              ];
              this.CinemasCopy = [
                {
                  cinema_id: "All",
                  cine_id: "All",
                  cine_name: "All",
                  cinema_name: "All",
                },
                ...data.Records,
              ];
            }
            this.Cinemas.map((x) => {
              if (String(cine_id) === String(x.cine_id)) {
                // this.fetchReservationDetail.cinema_id = x.cine_id;
                // this.selectedCinema = x.cine_name;
                this.onSelectCinema(null, {
                  cine_name: x.cine_name,
                  cine_id: x.cine_id,
                });
              }

              if (
                this.fetchReservationDetail &&
                this.fetchReservationDetail.cinema_id &&
                x.cine_id === this.fetchReservationDetail.cinema_id
              ) {
                this.selectedCinema = x.cine_name;
              }
            });
          } else {
            this.$toasted.show(data.message);
          }
        })
        .catch(this._CatchError);
    },

    onGetTransactionList: function () {
      // if(!this.fetchReservationDetail.cinema_id) this.$toasted.show("Please select cinema")

      if (
        (!this.fetchReservationDetail.to_date &&
          !this.fetchReservationDetail.from_date) ||
        (this.fetchReservationDetail.to_date &&
          !this.fetchReservationDetail.from_date) ||
        (!this.fetchReservationDetail.to_date &&
          this.fetchReservationDetail.from_date)
      )
        this.$toasted.show("Please select Reservation date range properly");

      this.reservationList = [];
      if (this.fetchReservationDetail.cinema_id && this.checkValidation) {
        let loader = this.$loading.show();

        this.btenable = true;
        let payload = {
          cinema_id: this.fetchReservationDetail.cinema_id,
          from_date: this.fetchReservationDetail.from_date
            ? moment(this.fetchReservationDetail.from_date).format("YYYY-MM-DD")
            : null,
          to_date: this.fetchReservationDetail.to_date
            ? moment(this.fetchReservationDetail.to_date).format("YYYY-MM-DD")
            : null,
          // filterkey: this.filterkey ? this.filterkey : null,
          // filtervalue: this.filtervalue ? this.filtervalue : null,
          limit: this.perPage,
          currentPage: this.currentPage,
          payment_status:this.selectedPaymentSource.payment_type || "",
        };
        if (!!this.searchReservations)
          payload.search_val = this.searchReservations;

            if (!!this.filter_is_active_label) {
                    payload.filter =
                      this.filter_is_active_label == "Failure"
                        ? "pending"
                        : this.filter_is_active_label ==
                          "Payment Success | Booking Success"
                        ? "success"
                        : this.filter_is_active_label ==
                          "Payment Success | Booking Failed"
                        ? "no_booking_with_payment"
                        : "all";
                  }

        MasterService.getReservationsDetailV2(payload)
          .then((response) => {
            this.btenable = false;
            const { data } = response;
            if (data.status && data.Records && data.Records.length > 0) {
              this.reservationList = data.Records;

//              const uniqueRecords = data.Records.filter((record, index, self) => 
//   index === self.findIndex(r => r.payment_type == record.payment_type)
// );
// this.statusList = uniqueRecords;
             console.log("statusList",this.statusList)
              this.reservationListCopy = data.Records;
              if (data.totalRows && data.totalRows >= 10) {
                this.rows = data.totalRows;
                this.selectedvalue = this.perPage;
              } else if (data.totalRows) {
                this.rows = data.totalRows;
                this.selectedvalue = data.totalRows;
              }
            } else if (data.Records && data.Records.length == 0) {
              this.rows = 0;
              this.selectedvalue = "0";
              this.$toasted.show("No Records Found.");
            } else {
              this.rows = 0;
              this.selectedvalue = "0";
              this.$toasted.show(data.message);
            }
          })
          .catch(this._CatchError)
          .finally(() => {
            setTimeout(() => loader.hide(), 100);
          });
      } else {
        this.$toasted.show("Invalid Selection");
      }
    },
    onSelectCinema: function (event, params) {
      this.searchCinema = "";
      this.searchReservations = "";
      this.onSearchCinema(null);
      this.$store.dispatch("selectDropdownCinema", params);
      this.selectedCinema = params.cine_name;
      this.fetchReservationDetail.cinema_id = params.cine_id;
      if (this.fetchReservationDetail.from_date) {
        // this.onGetTransactionList();
      } else {
        this.$toasted.show("Please select date");
      }
    },
    getSystemLogs(data) {
      this.paymentDetailsObj = {};
      let loader = this.$loading.show();

      MasterService.getPaymentFlowLogs(data.reservation_id)
        .then((res) => {
          if (!res.data.status) {
            return this.$toasted.show(
              res.data.message || "Something Went Wrong"
            );
          }

          this.paymentDetailsObj = {
            logs: res.data.logs,
          };
          this.$bvModal.show("paymentDetailsModal");
        })
        .finally(() => {
          loader.hide();
        });
    },
  },
};
</script>

<style scoped>
.sph-report th,
td {
  height: 30px;
}

.sticky-cell {
  position: sticky;
  left: 0;
  /* Adjust left value as needed */
  background-color: #f1f1f1;
  /* Optional: Adding background color */
  z-index: 1;
  /* Optional: Adding z-index to layer the sticky cell */
}

.sticky {
  position: sticky;
  left: 0;
  background-color: #f1f1f1;
  z-index: 1;
  /* Optional: Adding z-index to layer the sticky cell */
}

th.sticky:nth-child(2),
td:nth-child(2) {
  left: 140px;
  z-index: 1;
  /* Optional: Adding z-index to layer the sticky cell */
}

th.sticky:nth-child(3),
td:nth-child(3) {
  left: 260px;
  z-index: 1;
  /* Optional: Adding z-index to layer the sticky cell */
}
</style>
