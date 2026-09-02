import { useState } from "react";
import { FaSpotify } from "react-icons/fa";
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

function App() {
  const [genre, setGenre] = useState("");
  const [role, setRole] = useState("Creator");

  return (
    <div className="app">
      {/* ================= HEADER ================= */}
      <header className="topbar">
        <div className="brand-area">
        <div className="spotify-logo">
  <FaSpotify />
</div>

          <h1>
            <span className="spotify-green">Spotify</span>{" "}
            Track Manager
          </h1>

          <div className="header-divider"></div>

          <span className="exam-label">
            Set 1 • Practical Exam
          </span>
        </div>

        <div className="waveform" aria-hidden="true">
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

      {/* ================= MAIN ================= */}
      <main className="dashboard">

        {/* ========== LEFT: REGISTER FORM ========== */}
        <section className="panel register-panel">
          <div className="panel-title">
            <EditNoteIcon />

            <div>
              <h2>REGISTER NEW TRACK</h2>
            </div>
          </div>

          <div className="form-content">

            {/* Track Title */}
            <div className="field-group">
              <label>
                <MusicNoteIcon />
                Track Title
              </label>

              <input
                type="text"
                placeholder="Enter track title"
              />
            </div>

            {/* Genre */}
            <div className="field-group">
              <label>
                <QueueMusicIcon />
                Genre
              </label>

              <FormControl fullWidth size="small">
                <Select
                  value={genre}
                  displayEmpty
                  onChange={(event) => setGenre(event.target.value)}
                  className="dark-select"
                >
                  <MenuItem value="">
                    <span className="placeholder">
                      Select genre
                    </span>
                  </MenuItem>

                  <MenuItem value="Pop">Pop</MenuItem>
                  <MenuItem value="Rock">Rock</MenuItem>
                  <MenuItem value="Indie">Indie</MenuItem>
                  <MenuItem value="Jazz">Jazz</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Artist */}
            <div className="field-group">
              <label>
                <PersonIcon />
                Artist Name
              </label>

              <input
                type="text"
                placeholder="Enter artist name"
              />
            </div>

            {/* BPM */}
            <div className="field-group">
              <label>
                <SpeedIcon />
                Rating / BPM (1-100)
              </label>

              <input
                type="number"
                min="1"
                max="100"
                placeholder="Enter rating or BPM (1-100)"
              />
            </div>

            {/* Record Label */}
            <div className="field-group">
              <label>
                <BusinessIcon />
                Record Label Name
              </label>

              <input
                type="text"
                placeholder="Enter record label name"
              />
            </div>

            {/* User Role */}
            <div className="field-group role-field">
              <label>
                <GroupsIcon />
                User Role
              </label>

              <RadioGroup
                row
                value={role}
                onChange={(event) => setRole(event.target.value)}
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
              variant="contained"
              startIcon={<AddIcon />}
              className="add-track-button"
            >
              ADD TRACK TO REGISTRY
            </Button>
          </div>
        </section>

        {/* ========== RIGHT SIDE ========== */}
        <div className="right-column">

          {/* ========== TRACK REGISTRY ========== */}
          <section className="panel registry-panel">

            <div className="registry-header">

              <div className="panel-title">
                <QueueMusicIcon />

                <div>
                  <h2>TRACK REGISTRY</h2>
                </div>
              </div>

              <button className="role-filter">
                <FilterAltIcon />
                <span>All Roles</span>
                <span className="filter-arrow">⌄</span>
              </button>
            </div>

            <div className="table-wrapper">
              <table className="track-table">

                <thead>
                  <tr>
                    <th>#</th>
                    <th>Track Title</th>
                    <th>Genre</th>
                    <th>Artist</th>
                    <th>BPM</th>
                    <th>Record Label</th>
                    <th>User Role</th>
                  </tr>
                </thead>

                <tbody>

                  <tr className="selected-row">
                    <td>1</td>

                    <td className="track-name">
                      <div className="play-button">
                        ▶
                      </div>

                      Blinding Lights
                    </td>

                    <td>Pop</td>
                    <td>The Weeknd</td>
                    <td>90</td>
                    <td>Republic Records</td>

                    <td>
                      <span className="role-badge creator">
                        Creator
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>Yellow</td>
                    <td>Rock</td>
                    <td>Coldplay</td>
                    <td>80</td>
                    <td>Parlophone</td>

                    <td>
                      <span className="role-badge listener">
                        Listener
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>Riptide</td>
                    <td>Indie</td>
                    <td>Vance Joy</td>
                    <td>75</td>
                    <td>Atlantic Records</td>

                    <td>
                      <span className="role-badge creator">
                        Creator
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>4</td>
                    <td>Stay</td>
                    <td>Pop</td>
                    <td>Justin Bieber</td>
                    <td>95</td>
                    <td>Def Jam</td>

                    <td>
                      <span className="role-badge listener">
                        Listener
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td>5</td>
                    <td>Someone Like You</td>
                    <td>Pop</td>
                    <td>Adele</td>
                    <td>68</td>
                    <td>XL Recordings</td>

                    <td>
                      <span className="role-badge creator">
                        Creator
                      </span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <div className="pagination">

              <button className="pagination-button disabled">
                <ArrowBackIosNewIcon />
                Previous
              </button>

              <span>
                Page <strong>1</strong> of <strong>2</strong>
              </span>

              <button className="pagination-button">
                Next
                <ArrowForwardIosIcon />
              </button>

            </div>

          </section>

          {/* ========== ACTIVE TRACK ========== */}
          <section className="panel active-panel">

            <div className="panel-title">
              <PersonIcon />

              <div>
                <h2>ACTIVE TRACK PROFILE</h2>
              </div>
            </div>

            <div className="active-content">

              {/* Album Art */}
              <div className="album-art">
                <div className="album-title">
                  BLINDING LIGHTS
                </div>

                <div className="album-center">
                  <MusicNoteIcon />
                </div>

                <div className="album-artist">
                  THE WEEKND
                </div>
              </div>

              {/* Details */}
              <div className="track-details">

                <h3>Blinding Lights</h3>

                <p className="artist-name">
                  The Weeknd
                </p>

                <div className="detail-row">
                  <QueueMusicIcon />
                  <span>Genre</span>
                  <strong>Pop</strong>
                </div>

                <div className="detail-row">
                  <SpeedIcon />
                  <span>Rating / BPM</span>
                  <strong>90</strong>
                </div>

                <div className="detail-row">
                  <BusinessIcon />
                  <span>Record Label</span>
                  <strong>Republic Records</strong>
                </div>

                <div className="detail-row">
                  <PersonIcon />
                  <span>User Role</span>

                  <strong>
                    <span className="profile-role">
                      CREATOR
                    </span>
                  </strong>
                </div>

              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <span>Spotify Track Manager</span>
        <span>•</span>
        <span>Set 1</span>
        <span>•</span>
        <span>Practical Exam</span>
        <span className="footer-heart">♥</span>
      </footer>
    </div>
  );
}

export default App;