import { useEffect, useMemo, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import mansBestFriend from "./assets/mans-best-friend.jpg";

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
      title: "Manchild",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 92,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 2,
      title: "Tears",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 88,
      label: "Island Records",
      role: "Listener",
    },
    {
      id: 3,
      title: "My Man on Willpower",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 96,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 4,
      title: "Sugar Talking",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 94,
      label: "Island Records",
      role: "Listener",
    },
    {
      id: 5,
      title: "We Almost Broke Up Again Last Night",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 86,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 6,
      title: "Nobody's Son",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 90,
      label: "Island Records",
      role: "Listener",
    },
    {
      id: 7,
      title: "Never Getting Laid",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 98,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 8,
      title: "When Did You Get Hot?",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 100,
      label: "Island Records",
      role: "Listener",
    },
    {
      id: 9,
      title: "Go Go Juice",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 97,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 10,
      title: "Don't Worry I'll Make You Worry",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 89,
      label: "Island Records",
      role: "Listener",
    },
    {
      id: 11,
      title: "House Tour",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 95,
      label: "Island Records",
      role: "Creator",
    },
    {
      id: 12,
      title: "Goodbye",
      genre: "Pop",
      artist: "Sabrina Carpenter",
      bpm: 84,
      label: "Island Records",
      role: "Listener",
    },
  ]);

  // =====================================================
  // ACTIVE TRACK
  // =====================================================

  const [activeTrack, setActiveTrack] = useState(tracks[0]);

  // =====================================================
  // SELECTED TRACK
  // =====================================================

  const [selectedTrackId, setSelectedTrackId] = useState(
    String(tracks[0].id)
  );

  // =====================================================
  // ROLE FILTER
  // =====================================================

  const [roleFilter, setRoleFilter] = useState("All Roles");

  // =====================================================
  // CONTROLLED PAGINATION STATE
  // =====================================================

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

  // =====================================================
  // FILTER TRACKS
  // =====================================================

  const filteredTracks = useMemo(() => {
    if (roleFilter === "All Roles") {
      return tracks;
    }

    return tracks.filter(
      (track) => track.role === roleFilter
    );
  }, [tracks, roleFilter]);

  // =====================================================
  // USE EFFECT
  // =====================================================
  // Keeps the Active Track Profile synchronized
  // with the selected track.
  // =====================================================

  useEffect(() => {
    const selectedTrack = filteredTracks.find(
      (track) =>
        String(track.id) === selectedTrackId
    );

    if (selectedTrack) {
      setActiveTrack(selectedTrack);

      // Automatically move to the page where
      // the selected track is located.
      const selectedIndex = filteredTracks.findIndex(
        (track) =>
          String(track.id) === selectedTrackId
      );

      if (selectedIndex >= 0) {
        const targetPage = Math.floor(
          selectedIndex / pagination.pageSize
        );

        if (pagination.pageIndex !== targetPage) {
          setPagination((current) => ({
            ...current,
            pageIndex: targetPage,
          }));
        }
      }

      return;
    }

    // If the selected track is no longer available
    // because of the filter, select the first track.
    if (filteredTracks.length > 0) {
      const firstTrack = filteredTracks[0];

      setSelectedTrackId(
        String(firstTrack.id)
      );

      setActiveTrack(firstTrack);

      setPagination((current) => ({
        ...current,
        pageIndex: 0,
      }));
    } else {
      setActiveTrack(null);

      setPagination((current) => ({
        ...current,
        pageIndex: 0,
      }));
    }
  }, [
    selectedTrackId,
    filteredTracks,
    pagination.pageSize,
  ]);

  // =====================================================
  // FORM VALIDATION
  // =====================================================

  function validateForm() {
    const newErrors = {};

    // Track Title
    if (!trackTitle.trim()) {
      newErrors.trackTitle =
        "Track title is required.";
    } else if (trackTitle.trim().length < 3) {
      newErrors.trackTitle =
        "Track title must be at least 3 characters.";
    }

    // Genre
    if (!genre) {
      newErrors.genre =
        "Please select a genre.";
    }

    // Artist
    if (!artistName.trim()) {
      newErrors.artistName =
        "Artist name is required.";
    } else if (artistName.trim().length < 3) {
      newErrors.artistName =
        "Artist name must be at least 3 characters.";
    }

    // BPM / Rating
    if (!bpm) {
      newErrors.bpm =
        "Rating / BPM is required.";
    } else if (
      Number(bpm) < 1 ||
      Number(bpm) > 100
    ) {
      newErrors.bpm =
        "Rating / BPM must be between 1 and 100.";
    }

    // Record Label
    if (!recordLabel.trim()) {
      newErrors.recordLabel =
        "Record label name is required.";
    } else if (
      recordLabel.trim().length < 3
    ) {
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

    const updatedTracks = [
      ...tracks,
      newTrack,
    ];

    setTracks(updatedTracks);

    // Select the newly added track.
    setSelectedTrackId(
      String(newTrack.id)
    );

    // =================================================
    // AUTOMATICALLY FIND THE NEW TRACK'S PAGE
    // =================================================

    const updatedFilteredTracks =
      roleFilter === "All Roles"
        ? updatedTracks
        : updatedTracks.filter(
            (track) =>
              track.role === roleFilter
          );

    const newTrackIndex =
      updatedFilteredTracks.findIndex(
        (track) =>
          track.id === newTrack.id
      );

    if (newTrackIndex >= 0) {
      const targetPage = Math.floor(
        newTrackIndex /
          pagination.pageSize
      );

      setPagination((current) => ({
        ...current,
        pageIndex: targetPage,
      }));
    }

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
          cell: ({ row }) =>
            row.getDisplayIndex() + 1,
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

    getRowId: (row) =>
      String(row.id),

    enableRowSelection: true,

    enableMultiRowSelection: false,

    // Controlled pagination
    state: {
      pagination,
    },

    onPaginationChange: setPagination,
  });

  // =====================================================
  // PAGINATION VALUES
  // =====================================================

  const currentPage =
    pagination.pageIndex + 1;

  const pageCount =
    Math.max(1, table.getPageCount());

  const canGoPrevious =
    pagination.pageIndex > 0;

  const canGoNext =
    pagination.pageIndex <
    table.getPageCount() - 1;

  return (
    <div className="app">

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
          <span></span>
        </div>

        <div className="music-circle">
          <MusicNoteIcon />
        </div>

      </header>

      <main className="dashboard">


        <section className="panel register-panel">

          <div className="panel-title">

            <EditNoteIcon />

            <div>
              <h2>
                REGISTER NEW TRACK
              </h2>

              <p>
                Add a new track to the registry
              </p>
            </div>

          </div>

          <form
            className="form-content"
            onSubmit={handleSubmit}
          >

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
                  setTrackTitle(
                    event.target.value
                  );

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
                    setGenre(
                      event.target.value
                    );

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
                  setArtistName(
                    event.target.value
                  );

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
                  setBpm(
                    event.target.value
                  );

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
                  setRecordLabel(
                    event.target.value
                  );

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

        <div className="right-column">

          <section className="panel registry-panel">

            <div
              className="registry-header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >

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

<div
  className="filter-area"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
  }}
>
  <FormControl
    size="small"
    sx={{
      minWidth: "170px",
    }}
  >

                  <Select
                    value={roleFilter}

                    onChange={(event) => {
                      const newFilter =
                        event.target.value;

                      setRoleFilter(newFilter);

                      setPagination((current) => ({
                        ...current,
                        pageIndex: 0,
                      }));

                      const newFilteredTracks =
                        newFilter === "All Roles"
                          ? tracks
                          : tracks.filter(
                              (track) =>
                                track.role ===
                                newFilter
                            );

                      if (
                        newFilteredTracks.length > 0
                      ) {
                        setSelectedTrackId(
                          String(
                            newFilteredTracks[0].id
                          )
                        );
                      }
                    }}

                    className="role-filter"

                    displayEmpty

                    sx={{
                      height: "48px",

                      color: "#ffffff",

                      backgroundColor:
                        "rgba(8, 14, 12, 0.75)",

                      borderRadius: "9px",

                      "& .MuiSelect-select": {
                        color: "#ffffff",
                        fontSize: "16px",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "16px",
                      },

                      "& .MuiSelect-icon": {
                        color: "#ffffff",
                        fontSize: "28px",
                        right: "8px",
                      },

                      "& fieldset": {
                        borderColor: "#29332f",
                        borderWidth: "2px",
                      },

                      "&:hover fieldset": {
                        borderColor: "#3b4742",
                      },

                      "&.Mui-focused fieldset": {
                        borderColor: "#1ed760",
                      },
                    }}
                  >

                    <MenuItem
                      value="All Roles"
                      sx={{
                        color: "#ffffff",
                        backgroundColor: "#101815",

                        "&:hover": {
                          backgroundColor: "#18221e",
                        },

                        "&.Mui-selected": {
                          backgroundColor:
                            "#1d2b25",
                        },

                        "&.Mui-selected:hover": {
                          backgroundColor:
                            "#24352d",
                        },
                      }}
                    >
                      All Roles
                    </MenuItem>

                    <MenuItem
                      value="Creator"
                      sx={{
                        color: "#ffffff",
                        backgroundColor: "#101815",

                        "&:hover": {
                          backgroundColor: "#18221e",
                        },

                        "&.Mui-selected": {
                          backgroundColor:
                            "#1d2b25",
                        },

                        "&.Mui-selected:hover": {
                          backgroundColor:
                            "#24352d",
                        },
                      }}
                    >
                      Creator
                    </MenuItem>

                    <MenuItem
                      value="Listener"
                      sx={{
                        color: "#ffffff",
                        backgroundColor: "#101815",

                        "&:hover": {
                          backgroundColor: "#18221e",
                        },

                        "&.Mui-selected": {
                          backgroundColor:
                            "#1d2b25",
                        },

                        "&.Mui-selected:hover": {
                          backgroundColor:
                            "#24352d",
                        },
                      }}
                    >
                      Listener
                    </MenuItem>

                  </Select>

                </FormControl>

              </div>

            </div>

            <div className="table-wrapper">

              <table className="track-table">

                <thead>

                  {table.getHeaderGroups().map(
                    (headerGroup) => (
                      <tr
                        key={headerGroup.id}
                      >

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

                  {table.getRowModel().rows.length >
                  0 ? (

                    table
                      .getRowModel()
                      .rows
                      .map((row) => (

                        <tr
                          key={row.id}

                          className={
                            selectedTrackId ===
                            String(
                              row.original.id
                            )
                              ? "selected-row"
                              : ""
                          }

                          onClick={() => {

                            row.toggleSelected(
                              true
                            );

                            setSelectedTrackId(
                              String(
                                row.original.id
                              )
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

                      ))

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

            <div className="pagination">

              <button
                type="button"

                className={`pagination-button ${
                  !canGoPrevious
                    ? "disabled"
                    : ""
                }`}

                disabled={!canGoPrevious}

                onClick={() => {
                  if (canGoPrevious) {
                    setPagination((current) => ({
                      ...current,
                      pageIndex:
                        current.pageIndex - 1,
                    }));
                  }
                }}
              >

                <ArrowBackIosNewIcon />

                Previous

              </button>

              <span>
                Page {currentPage} of {pageCount}
              </span>

              <button
                type="button"

                className={`pagination-button ${
                  !canGoNext
                    ? "disabled"
                    : ""
                }`}

                disabled={!canGoNext}

                onClick={() => {
                  if (canGoNext) {
                    setPagination((current) => ({
                      ...current,
                      pageIndex:
                        current.pageIndex + 1,
                    }));
                  }
                }}
              >

                Next

                <ArrowForwardIosIcon />

              </button>

            </div>

          </section>

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

<div className="album-art">
  <img
    src={mansBestFriend}
    alt="Sabrina Carpenter - Man's Best Friend"
  />
</div>



                <div className="track-details">

                  <h3>
                    {activeTrack.title}
                  </h3>

                  <p className="artist-name">
                    {activeTrack.artist}
                  </p>

                  <div className="detail-row">

                    <QueueMusicIcon />

                    <span>
                      Genre
                    </span>

                    <strong>
                      {activeTrack.genre}
                    </strong>

                  </div>

                  <div className="detail-row">

                    <PersonIcon />

                    <span>
                      Artist
                    </span>

                    <strong>
                      {activeTrack.artist}
                    </strong>

                  </div>

                  <div className="detail-row">

                    <SpeedIcon />

                    <span>
                      Rating / BPM
                    </span>

                    <strong>
                      {activeTrack.bpm}
                    </strong>

                  </div>

                  <div className="detail-row">

                    <BusinessIcon />

                    <span>
                      Record Label
                    </span>

                    <strong>
                      {activeTrack.label}
                    </strong>

                  </div>

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