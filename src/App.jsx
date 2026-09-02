import { useMemo, useState } from "react";
import { FaSpotify } from "react-icons/fa";

import {
  createColumnHelper,
  createPaginatedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";

import {
  Button,
  FormControl,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
} from "@mui/material";

import EditNoteIcon from "@mui/icons-material/EditNote";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import BusinessIcon from "@mui/icons-material/Business";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";

import "./App.css";

// =====================================================
// TANSTACK TABLE FEATURES
// =====================================================

const features = tableFeatures({
  rowPaginationFeature,
  rowSelectionFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

const columnHelper = createColumnHelper();

function App() {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [trackTitle, setTrackTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [artistName, setArtistName] = useState("");
  const [bpm, setBpm] = useState("");
  const [recordLabel, setRecordLabel] = useState("");
  const [role, setRole] = useState("Creator");

  // =====================================================
  // ERROR STATE
  // =====================================================

  const [errors, setErrors] = useState({});

  // =====================================================
  // SAMPLE TRACKS
  // =====================================================

  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Midnight City",
      genre: "Indie",
      artist: "M83",
      bpm: 105,
      label: "Mute Records",
      role: "Creator",
    },
    {
      id: 2,
      title: "Blinding Lights",
      genre: "Pop",
      artist: "The Weeknd",
      bpm: 171,
      label: "XO Records",
      role: "Listener",
    },
    {
      id: 3,
      title: "Do I Wanna Know?",
      genre: "Rock",
      artist: "Arctic Monkeys",
      bpm: 85,
      label: "Domino",
      role: "Creator",
    },
    {
      id: 4,
      title: "Take Five",
      genre: "Jazz",
      artist: "Dave Brubeck",
      bpm: 174,
      label: "Columbia",
      role: "Listener",
    },
    {
      id: 5,
      title: "Levitating",
      genre: "Pop",
      artist: "Dua Lipa",
      bpm: 103,
      label: "Warner Records",
      role: "Creator",
    },
  ]);

  // =====================================================
  // ACTIVE TRACK
  // =====================================================

  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  // =====================================================
  // ROLE FILTER
  // =====================================================

  const [roleFilter, setRoleFilter] = useState("All Roles");

  // =====================================================
  // FILTER TRACKS
  // =====================================================

  const filteredTracks =
    roleFilter === "All Roles"
      ? tracks
      : tracks.filter((track) => track.role === roleFilter);

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  function validateForm() {
    const newErrors = {};

    // Track Title
    if (!trackTitle.trim()) {
      newErrors.trackTitle = "Track title is required.";
    } else if (trackTitle.trim().length < 3) {
      newErrors.trackTitle =
        "Track title must be at least 3 characters.";
    }

    // Genre
    if (!genre) {
      newErrors.genre = "Please select a genre.";
    }

    // Artist Name
    if (!artistName.trim()) {
      newErrors.artistName = "Artist name is required.";
    } else if (artistName.trim().length < 3) {
      newErrors.artistName =
        "Artist name must be at least 3 characters.";
    }

    // BPM / Rating
    if (!bpm) {
      newErrors.bpm = "Rating / BPM is required.";
    } else if (Number(bpm) < 1 || Number(bpm) > 100) {
      newErrors.bpm =
        "Rating / BPM must be between 1 and 100.";
    }

    // Record Label
    if (!recordLabel.trim()) {
      newErrors.recordLabel =
        "Record label name is required.";
    } else if (recordLabel.trim().length < 3) {
      newErrors.recordLabel =
        "Record label must be at least 3 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // =====================================================
  // FORM SUBMIT
  // =====================================================

  function handleSubmit(event) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const newTrack = {
      id: tracks.length + 1,
      title: trackTitle.trim(),
      genre: genre,
      artist: artistName.trim(),
      bpm: Number(bpm),
      label: recordLabel.trim(),
      role: role,
    };

    setTracks((currentTracks) => [
      ...currentTracks,
      newTrack,
    ]);

    setActiveTrack(newTrack);

    // Clear form
    setTrackTitle("");
    setGenre("");
    setArtistName("");
    setBpm("");
    setRecordLabel("");
    setRole("Creator");

    // Clear errors
    setErrors({});
  }

  // =====================================================
  // TANSTACK TABLE COLUMNS
  // =====================================================

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.display({
          id: "number",
          header: "#",
          cell: ({ row }) => row.getDisplayIndex() + 1,
        }),

        columnHelper.accessor("title", {
          header: "Track Title",
          cell: ({ row }) => (
            <span className="track-name">
              {row.original.title}
            </span>
          ),
        }),

        columnHelper.accessor("genre", {
          header: "Genre",
          cell: ({ row }) => (
            <span className="genre-badge">
              {row.original.genre}
            </span>
          ),
        }),

        columnHelper.accessor("artist", {
          header: "Artist",
        }),

        columnHelper.accessor("bpm", {
          header: "BPM",
        }),

        columnHelper.accessor("label", {
          header: "Record Label",
        }),

        columnHelper.accessor("role", {
          header: "User Role",
          cell: ({ row }) => (
            <span
              className={`role-badge ${row.original.role.toLowerCase()}`}
            >
              {row.original.role}
            </span>
          ),
        }),
      ]),
    []
  );

  // =====================================================
  // TANSTACK TABLE
  // =====================================================

  const table = useTable({
    key: "spotify-track-manager",

    features,

    columns,

    data: filteredTracks,

    getRowId: (row) => String(row.id),

    enableRowSelection: true,

    enableMultiRowSelection: false,

    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 3,
      },
    },
  });

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="app">

      {/* =========================
          HEADER
      ========================= */}

      <header className="topbar">

        <div className="brand-area">

          <div className="spotify-logo">
            <FaSpotify />
          </div>

          <h1>
            <span className="spotify-green">
              Spotify
            </span>{" "}
            Track Manager
          </h1>

          <div className="header-divider"></div>

          <span className="exam-label">
            Set 1 • Practical Exam
          </span>

        </div>

        <div className="waveform">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="music-circle">
          <MusicNoteIcon />
        </div>

      </header>


      {/* =========================
          MAIN DASHBOARD
      ========================= */}

      <main className="dashboard">

        {/* =========================
            REGISTER NEW TRACK
        ========================= */}

        <section className="panel register-panel">

          <div className="panel-title">

            <EditNoteIcon />

            <div>
              <h2>REGISTER NEW TRACK</h2>

              <p>
                Add a new track to the registry
              </p>
            </div>

          </div>


          {/* FORM */}

          <form
            className="form-content"
            onSubmit={handleSubmit}
          >

            {/* TRACK TITLE */}

            <div className="field-group">

              <label>
                <MusicNoteIcon />
                Track Title
              </label>

              <input
                type="text"
                placeholder="Enter track title"
                value={trackTitle}
                onChange={(event) => {
                  setTrackTitle(event.target.value);

                  if (errors.trackTitle) {
                    setErrors({
                      ...errors,
                      trackTitle: "",
                    });
                  }
                }}
              />

              {errors.trackTitle && (
                <span className="error-message">
                  {errors.trackTitle}
                </span>
              )}

            </div>


            {/* GENRE */}

            <div className="field-group">

              <label>
                <QueueMusicIcon />
                Genre
              </label>

              <FormControl fullWidth>

                <Select
                  value={genre}
                  displayEmpty
                  className="dark-select"

                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span
                          style={{
                            color: "#ffffff",
                          }}
                        >
                          Select genre
                        </span>
                      );
                    }

                    return (
                      <span
                        style={{
                          color: "#ffffff",
                        }}
                      >
                        {selected}
                      </span>
                    );
                  }}

                  onChange={(event) => {
                    setGenre(event.target.value);

                    if (errors.genre) {
                      setErrors({
                        ...errors,
                        genre: "",
                      });
                    }
                  }}
                >

                  <MenuItem value="">
                    Select genre
                  </MenuItem>

                  <MenuItem value="Pop">
                    Pop
                  </MenuItem>

                  <MenuItem value="Rock">
                    Rock
                  </MenuItem>

                  <MenuItem value="Indie">
                    Indie
                  </MenuItem>

                  <MenuItem value="Jazz">
                    Jazz
                  </MenuItem>

                </Select>

              </FormControl>

              {errors.genre && (
                <span className="error-message">
                  {errors.genre}
                </span>
              )}

            </div>


            {/* ARTIST */}

            <div className="field-group">

              <label>
                <PersonIcon />
                Artist Name
              </label>

              <input
                type="text"
                placeholder="Enter artist name"
                value={artistName}
                onChange={(event) => {
                  setArtistName(event.target.value);

                  if (errors.artistName) {
                    setErrors({
                      ...errors,
                      artistName: "",
                    });
                  }
                }}
              />

              {errors.artistName && (
                <span className="error-message">
                  {errors.artistName}
                </span>
              )}

            </div>


            {/* BPM */}

            <div className="field-group">

              <label>
                <SpeedIcon />
                Rating / BPM
              </label>

              <input
                type="number"
                min="1"
                max="100"
                placeholder="1 - 100"
                value={bpm}
                onChange={(event) => {
                  setBpm(event.target.value);

                  if (errors.bpm) {
                    setErrors({
                      ...errors,
                      bpm: "",
                    });
                  }
                }}
              />

              {errors.bpm && (
                <span className="error-message">
                  {errors.bpm}
                </span>
              )}

            </div>


            {/* RECORD LABEL */}

            <div className="field-group">

              <label>
                <BusinessIcon />
                Record Label Name
              </label>

              <input
                type="text"
                placeholder="Enter record label"
                value={recordLabel}
                onChange={(event) => {
                  setRecordLabel(event.target.value);

                  if (errors.recordLabel) {
                    setErrors({
                      ...errors,
                      recordLabel: "",
                    });
                  }
                }}
              />

              {errors.recordLabel && (
                <span className="error-message">
                  {errors.recordLabel}
                </span>
              )}

            </div>


            {/* USER ROLE */}

            <div className="field-group role-field">

              <label>
                <GroupsIcon />
                User Role
              </label>

              <RadioGroup
                row
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
                className="role-group"
              >

                <FormControlLabel
                  value="Creator"
                  control={<Radio />}
                  label="Creator"
                />

                <FormControlLabel
                  value="Listener"
                  control={<Radio />}
                  label="Listener"
                />

              </RadioGroup>

            </div>


            {/* SUBMIT */}

            <Button
              type="submit"
              variant="contained"
              startIcon={<AddIcon />}
              className="add-track-button"
            >
              ADD TRACK TO REGISTRY
            </Button>

          </form>

        </section>


        {/* =========================
            RIGHT COLUMN
        ========================= */}

        <div className="right-column">

          {/* =========================
              TRACK REGISTRY
          ========================= */}

          <section className="panel registry-panel">

            <div className="registry-header">

              <div className="panel-title">

                <QueueMusicIcon />

                <div>

                  <h2>
                    TRACK REGISTRY
                  </h2>

                  <p>
                    {filteredTracks.length} tracks registered
                  </p>

                </div>

              </div>


              {/* ROLE FILTER */}

              <div className="filter-area">

                <FilterAltIcon />

                <FormControl size="small">

                  <Select
                    value={roleFilter}
                    onChange={(event) => {
                      setRoleFilter(
                        event.target.value
                      );

                      table.setPageIndex(0);
                    }}
                    className="role-filter"
                  >

                    <MenuItem value="All Roles">
                      All Roles
                    </MenuItem>

                    <MenuItem value="Creator">
                      Creator
                    </MenuItem>

                    <MenuItem value="Listener">
                      Listener
                    </MenuItem>

                  </Select>

                </FormControl>

              </div>

            </div>


            {/* TABLE */}

            <div className="table-wrapper">

              <table className="track-table">

                <thead>

                  {table.getHeaderGroups().map(
                    (headerGroup) => (
                      <tr key={headerGroup.id}>

                        {headerGroup.headers.map(
                          (header) => (
                            <th key={header.id}>

                              {header.isPlaceholder
                                ? null
                                : (
                                  <table.FlexRender
                                    header={header}
                                  />
                                )}

                            </th>
                          )
                        )}

                      </tr>
                    )
                  )}

                </thead>

                <tbody>

                  {table.getRowModel().rows.length > 0 ? (

                    table.getRowModel().rows.map(
                      (row) => (

                        <tr
                          key={row.id}

                          className={
                            row.getIsSelected()
                              ? "selected-row"
                              : ""
                          }

                          onClick={() => {
                            row.toggleSelected(true);
                            setActiveTrack(
                              row.original
                            );
                          }}
                        >

                          {row.getAllCells().map(
                            (cell) => (

                              <td key={cell.id}>

                                <table.FlexRender
                                  cell={cell}
                                />

                              </td>

                            )
                          )}

                        </tr>

                      )
                    )

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        style={{
                          textAlign: "center",
                          padding: "30px",
                        }}
                      >
                        No tracks found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>


            {/* PAGINATION */}

            <div className="pagination">

              <button
                type="button"

                className={`pagination-button ${
                  !table.getCanPreviousPage()
                    ? "disabled"
                    : ""
                }`}

                disabled={
                  !table.getCanPreviousPage()
                }

                onClick={() =>
                  table.previousPage()
                }
              >

                <ArrowBackIosNewIcon />

                Previous

              </button>


              <span>

                Page{" "}

                {table.state.pagination.pageIndex + 1}

                {" "}of{" "}

                {table.getPageCount()}

              </span>


              <button
                type="button"

                className={`pagination-button ${
                  !table.getCanNextPage()
                    ? "disabled"
                    : ""
                }`}

                disabled={
                  !table.getCanNextPage()
                }

                onClick={() =>
                  table.nextPage()
                }
              >

                Next

                <ArrowForwardIosIcon />

              </button>

            </div>

          </section>


          {/* =========================
              ACTIVE TRACK PROFILE
          ========================= */}

          <section className="panel active-panel">

            <div className="panel-title">

              <PersonIcon />

              <div>

                <h2>
                  ACTIVE TRACK PROFILE
                </h2>

                <p>
                  Selected track information
                </p>

              </div>

            </div>


            {activeTrack && (

              <div className="active-content">

                {/* ALBUM ART */}

                <div className="album-art">

                  <div className="album-title">
                    SPOTIFY
                  </div>

                  <div className="album-center">

                    <FaSpotify />

                  </div>

                  <div className="album-artist">
                    TRACK MANAGER
                  </div>

                </div>


                {/* TRACK DETAILS */}

                <div className="track-details">

                  <h3>
                    {activeTrack.title}
                  </h3>

                  <p className="artist-name">
                    {activeTrack.artist}
                  </p>


                  {/* GENRE */}

                  <div className="detail-row">

                    <QueueMusicIcon />

                    <span>
                      Genre
                    </span>

                    <strong>
                      {activeTrack.genre}
                    </strong>

                  </div>


                  {/* ARTIST */}

                  <div className="detail-row">

                    <PersonIcon />

                    <span>
                      Artist
                    </span>

                    <strong>
                      {activeTrack.artist}
                    </strong>

                  </div>


                  {/* BPM */}

                  <div className="detail-row">

                    <SpeedIcon />

                    <span>
                      Rating / BPM
                    </span>

                    <strong>
                      {activeTrack.bpm}
                    </strong>

                  </div>


                  {/* RECORD LABEL */}

                  <div className="detail-row">

                    <BusinessIcon />

                    <span>
                      Record Label
                    </span>

                    <strong>
                      {activeTrack.label}
                    </strong>

                  </div>


                  {/* USER ROLE */}

                  <div className="profile-role">

                    <span>
                      USER ROLE
                    </span>

                    <span
                      className={`role-badge ${
                        activeTrack.role.toLowerCase()
                      }`}
                    >
                      {activeTrack.role}
                    </span>

                  </div>

                </div>

              </div>

            )}

          </section>

        </div>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="footer">

        <FaSpotify />

        <span>
          Spotify Track Manager
        </span>

        <span>
          •
        </span>

        <span>
          Set 1
        </span>

        <span>
          •
        </span>

        <span>
          Practical Exam
        </span>

        <span className="footer-heart">
          ♥
        </span>

      </footer>

    </div>
  );
}

export default App;